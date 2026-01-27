import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  InscrireEtudiantDto,
  EnregistrerNoteDto,
  EnregistrerAbsenceDto,
} from './dto';

// Constantes métier
const POIDS_NOTE_CC = 0.3;
const POIDS_NOTE_SN = 0.7;
const SEUIL_ABSENCES_RATTRAPAGE = 4;
const SEUIL_NOTE_CC_RATTRAPAGE = 11;

export interface NoteMatiere {
  matiereId: number;
  matiereNom: string;
  credit: number;
  noteCC: number | null;
  noteSN: number | null;
  absences: number;
  noteFinale: number | null;
  noteCoefficiee: number | null;
  risqueRattrapage: boolean;
  motifRattrapage: string[];
}

export interface MoyenneSemestre {
  semestreId: number;
  semestreNom: string;
  annee: string;
  matieres: NoteMatiere[];
  totalCredits: number;
  totalNotesCoefficiees: number;
  moyenne: number | null;
  estValide: boolean;
}

@Injectable()
export class InscriptionService {
  constructor(private readonly db: DatabaseService) {}

  // ==================== INSCRIPTION ====================

  async inscrireEtudiant(dto: InscrireEtudiantDto) {
    // Vérifier que l'étudiant existe
    const etudiant = await this.db.etudiant.findUnique({
      where: { id: dto.etudiantId },
    });
    if (!etudiant) {
      throw new NotFoundException(
        `Étudiant avec l'ID ${dto.etudiantId} non trouvé`,
      );
    }

    // Vérifier que la matière existe
    const matiere = await this.db.matiere.findUnique({
      where: { id: dto.matiereId },
    });
    if (!matiere) {
      throw new NotFoundException(
        `Matière avec l'ID ${dto.matiereId} non trouvée`,
      );
    }

    // Vérifier si l'inscription existe déjà
    const inscriptionExistante = await this.db.assMatiereEtudiant.findUnique({
      where: {
        matiereId_etudiantId: {
          matiereId: dto.matiereId,
          etudiantId: dto.etudiantId,
        },
      },
    });
    if (inscriptionExistante) {
      throw new BadRequestException(
        "L'étudiant est déjà inscrit à cette matière",
      );
    }

    return await this.db.assMatiereEtudiant.create({
      data: {
        etudiantId: dto.etudiantId,
        matiereId: dto.matiereId,
      },
      include: {
        etudiant: true,
        matiere: true,
      },
    });
  }

  async desinscrireEtudiant(etudiantId: number, matiereId: number) {
    const inscription = await this.db.assMatiereEtudiant.findUnique({
      where: {
        matiereId_etudiantId: { matiereId, etudiantId },
      },
    });
    if (!inscription) {
      throw new NotFoundException('Inscription non trouvée');
    }

    return await this.db.assMatiereEtudiant.delete({
      where: {
        matiereId_etudiantId: { matiereId, etudiantId },
      },
    });
  }

  async getInscriptionsEtudiant(etudiantId: number) {
    return await this.db.assMatiereEtudiant.findMany({
      where: { etudiantId },
      include: {
        matiere: {
          include: { semestre: true },
        },
      },
    });
  }

  // ==================== NOTES ====================

  async enregistrerNote(dto: EnregistrerNoteDto) {
    const inscription = await this.db.assMatiereEtudiant.findUnique({
      where: {
        matiereId_etudiantId: {
          matiereId: dto.matiereId,
          etudiantId: dto.etudiantId,
        },
      },
    });
    if (!inscription) {
      throw new NotFoundException(
        "L'étudiant n'est pas inscrit à cette matière",
      );
    }

    const updateData: { noteCC?: number; noteSN?: number } = {};
    if (dto.noteCC !== undefined) updateData.noteCC = dto.noteCC;
    if (dto.noteSN !== undefined) updateData.noteSN = dto.noteSN;

    return await this.db.assMatiereEtudiant.update({
      where: {
        matiereId_etudiantId: {
          matiereId: dto.matiereId,
          etudiantId: dto.etudiantId,
        },
      },
      data: updateData,
      include: {
        etudiant: true,
        matiere: true,
      },
    });
  }

  // ==================== ABSENCES ====================

  async enregistrerAbsence(dto: EnregistrerAbsenceDto) {
    const inscription = await this.db.assMatiereEtudiant.findUnique({
      where: {
        matiereId_etudiantId: {
          matiereId: dto.matiereId,
          etudiantId: dto.etudiantId,
        },
      },
    });
    if (!inscription) {
      throw new NotFoundException(
        "L'étudiant n'est pas inscrit à cette matière",
      );
    }

    return await this.db.assMatiereEtudiant.update({
      where: {
        matiereId_etudiantId: {
          matiereId: dto.matiereId,
          etudiantId: dto.etudiantId,
        },
      },
      data: {
        absences: { increment: dto.nombreAbsences },
      },
      include: {
        etudiant: true,
        matiere: true,
      },
    });
  }

  async reinitialiserAbsences(etudiantId: number, matiereId: number) {
    return await this.db.assMatiereEtudiant.update({
      where: {
        matiereId_etudiantId: { matiereId, etudiantId },
      },
      data: { absences: 0 },
    });
  }

  // ==================== CALCULS ====================

  /**
   * Calcule la note finale d'une matière
   * Formule: (noteCC * 0.30) + (noteSN * 0.70)
   */
  calculerNoteFinale(
    noteCC: number | null,
    noteSN: number | null,
  ): number | null {
    if (noteCC === null || noteSN === null) {
      return null;
    }
    return noteCC * POIDS_NOTE_CC + noteSN * POIDS_NOTE_SN;
  }

  /**
   * Calcule la note coefficiée
   * Formule: noteFinale * credit
   */
  calculerNoteCoefficiee(
    noteFinale: number | null,
    credit: number,
  ): number | null {
    if (noteFinale === null) {
      return null;
    }
    return noteFinale * credit;
  }

  /**
   * Vérifie si l'étudiant est à risque de rattrapage
   * Conditions: absences >= 4 OU noteCC < 11
   */
  verifierRisqueRattrapage(
    absences: number,
    noteCC: number | null,
  ): { risque: boolean; motifs: string[] } {
    const motifs: string[] = [];

    if (absences >= SEUIL_ABSENCES_RATTRAPAGE) {
      motifs.push(
        `Absences excessives (${absences} >= ${SEUIL_ABSENCES_RATTRAPAGE})`,
      );
    }

    if (noteCC !== null && noteCC < SEUIL_NOTE_CC_RATTRAPAGE) {
      motifs.push(
        `Note CC insuffisante (${noteCC} < ${SEUIL_NOTE_CC_RATTRAPAGE})`,
      );
    }

    return {
      risque: motifs.length > 0,
      motifs,
    };
  }

  /**
   * Récupère les notes détaillées d'un étudiant pour une matière
   */
  async getNoteMatiere(
    etudiantId: number,
    matiereId: number,
  ): Promise<NoteMatiere> {
    const inscription = await this.db.assMatiereEtudiant.findUnique({
      where: {
        matiereId_etudiantId: { matiereId, etudiantId },
      },
      include: {
        matiere: true,
      },
    });

    if (!inscription) {
      throw new NotFoundException('Inscription non trouvée');
    }

    const noteFinale = this.calculerNoteFinale(
      inscription.noteCC,
      inscription.noteSN,
    );
    const noteCoefficiee = this.calculerNoteCoefficiee(
      noteFinale,
      inscription.matiere.credit,
    );
    const { risque, motifs } = this.verifierRisqueRattrapage(
      inscription.absences,
      inscription.noteCC,
    );

    return {
      matiereId: inscription.matiere.id,
      matiereNom: inscription.matiere.nom,
      credit: inscription.matiere.credit,
      noteCC: inscription.noteCC,
      noteSN: inscription.noteSN,
      absences: inscription.absences,
      noteFinale,
      noteCoefficiee,
      risqueRattrapage: risque,
      motifRattrapage: motifs,
    };
  }

  /**
   * Calcule la moyenne d'un étudiant pour un semestre
   * Formule: Σ(noteFinale * credit) / Σ(credits)
   */
  async getMoyenneSemestre(
    etudiantId: number,
    semestreId: number,
  ): Promise<MoyenneSemestre> {
    // Récupérer le semestre
    const semestre = await this.db.semestre.findUnique({
      where: { id: semestreId },
      include: {
        matieres: true,
      },
    });

    if (!semestre) {
      throw new NotFoundException(
        `Semestre avec l'ID ${semestreId} non trouvé`,
      );
    }

    // Récupérer les inscriptions de l'étudiant pour ce semestre
    const inscriptions = await this.db.assMatiereEtudiant.findMany({
      where: {
        etudiantId,
        matiere: {
          semestreId,
        },
      },
      include: {
        matiere: true,
      },
    });

    const matieres: NoteMatiere[] = inscriptions.map((inscription) => {
      const noteFinale = this.calculerNoteFinale(
        inscription.noteCC,
        inscription.noteSN,
      );
      const noteCoefficiee = this.calculerNoteCoefficiee(
        noteFinale,
        inscription.matiere.credit,
      );
      const { risque, motifs } = this.verifierRisqueRattrapage(
        inscription.absences,
        inscription.noteCC,
      );

      return {
        matiereId: inscription.matiere.id,
        matiereNom: inscription.matiere.nom,
        credit: inscription.matiere.credit,
        noteCC: inscription.noteCC,
        noteSN: inscription.noteSN,
        absences: inscription.absences,
        noteFinale,
        noteCoefficiee,
        risqueRattrapage: risque,
        motifRattrapage: motifs,
      };
    });

    // Calculer les totaux
    const totalCredits = matieres.reduce((sum, m) => sum + m.credit, 0);
    const matieresAvecNotes = matieres.filter((m) => m.noteCoefficiee !== null);
    const totalNotesCoefficiees = matieresAvecNotes.reduce(
      (sum, m) => sum + (m.noteCoefficiee ?? 0),
      0,
    );

    // Calculer la moyenne (seulement si toutes les notes sont présentes)
    const toutesNotesPresentes = matieres.every((m) => m.noteFinale !== null);
    const moyenne =
      toutesNotesPresentes && totalCredits > 0
        ? totalNotesCoefficiees / totalCredits
        : null;

    return {
      semestreId: semestre.id,
      semestreNom: semestre.nom,
      annee: semestre.annee,
      matieres,
      totalCredits,
      totalNotesCoefficiees,
      moyenne,
      estValide: moyenne !== null && moyenne >= 10,
    };
  }

  /**
   * Récupère la liste des étudiants à risque de rattrapage pour un semestre
   */
  async getEtudiantsARisque(semestreId: number) {
    const inscriptions = await this.db.assMatiereEtudiant.findMany({
      where: {
        matiere: {
          semestreId,
        },
      },
      include: {
        etudiant: true,
        matiere: true,
      },
    });

    const etudiantsARisque = new Map<
      number,
      {
        etudiant: {
          id: number;
          nom: string;
          prenom: string;
          matricule: string;
        };
        matieresARisque: { matiere: string; motifs: string[] }[];
      }
    >();

    for (const inscription of inscriptions) {
      const { risque, motifs } = this.verifierRisqueRattrapage(
        inscription.absences,
        inscription.noteCC,
      );

      if (risque) {
        const etudiantId = inscription.etudiant.id;
        if (!etudiantsARisque.has(etudiantId)) {
          etudiantsARisque.set(etudiantId, {
            etudiant: {
              id: inscription.etudiant.id,
              nom: inscription.etudiant.nom,
              prenom: inscription.etudiant.prenom,
              matricule: inscription.etudiant.matricule,
            },
            matieresARisque: [],
          });
        }
        etudiantsARisque.get(etudiantId)!.matieresARisque.push({
          matiere: inscription.matiere.nom,
          motifs,
        });
      }
    }

    return Array.from(etudiantsARisque.values());
  }

  /**
   * Récupère le bulletin complet d'un étudiant (tous les semestres)
   */
  async getBulletinEtudiant(etudiantId: number) {
    // Récupérer l'étudiant
    const etudiant = await this.db.etudiant.findUnique({
      where: { id: etudiantId },
      include: {
        departement: true,
        axe: true,
        promotion: true,
      },
    });

    if (!etudiant) {
      throw new NotFoundException(
        `Étudiant avec l'ID ${etudiantId} non trouvé`,
      );
    }

    // Récupérer tous les semestres où l'étudiant a des inscriptions
    const inscriptions = await this.db.assMatiereEtudiant.findMany({
      where: { etudiantId },
      include: {
        matiere: {
          include: { semestre: true },
        },
      },
    });

    // Grouper par semestre
    const semestresIds = [
      ...new Set(inscriptions.map((i) => i.matiere.semestreId)),
    ];

    const semestres: MoyenneSemestre[] = [];
    for (const semestreId of semestresIds) {
      const moyenneSemestre = await this.getMoyenneSemestre(
        etudiantId,
        semestreId,
      );
      semestres.push(moyenneSemestre);
    }

    // Calculer la moyenne générale
    const semestresValides = semestres.filter((s) => s.moyenne !== null);
    const moyenneGenerale =
      semestresValides.length > 0
        ? semestresValides.reduce((sum, s) => sum + (s.moyenne ?? 0), 0) /
          semestresValides.length
        : null;

    return {
      etudiant: {
        id: etudiant.id,
        matricule: etudiant.matricule,
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        departement: etudiant.departement.nom,
        axe: etudiant.axe.nom,
        promotion: etudiant.promotion.annee,
      },
      semestres,
      moyenneGenerale,
    };
  }
}
