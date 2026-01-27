import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { AssignMatiereEtudiantDto } from './dto/assign-matiere-etudiant.dto';

@Injectable()
export class MatiereService {
  constructor(private readonly db: DatabaseService) {}

  async create(createMatiereDto: CreateMatiereDto) {
    return this.db.matiere.create({
      data: createMatiereDto,
    });
  }

  async findAll() {
    return this.db.matiere.findMany({
      include: {
        semestre: true,
        etudiants: {
          include: { etudiant: true },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.db.matiere.findUnique({
      where: { id },
      include: {
        semestre: true,
        etudiants: {
          include: { etudiant: true },
        },
      },
    });
  }

  async update(id: number, updateMatiereDto: UpdateMatiereDto) {
    return this.db.matiere.update({
      where: { id },
      data: updateMatiereDto,
    });
  }

  async remove(id: number) {
    return this.db.matiere.delete({
      where: { id },
    });
  }

  async assignToEtudiant(matiereId: number, etudiantId: number) {
    return this.db.assMatiereEtudiant.create({
      data: {
        matiereId,
        etudiantId,
      },
    });
  }

  async unassignFromEtudiant(matiereId: number, etudiantId: number) {
    return this.db.assMatiereEtudiant.delete({
      where: {
        matiereId_etudiantId: {
          matiereId,
          etudiantId,
        },
      },
    });
  }

  async updateNotesAndAbsences(
    matiereId: number,
    etudiantId: number,
    data: AssignMatiereEtudiantDto,
  ) {
    return this.db.assMatiereEtudiant.update({
      where: {
        matiereId_etudiantId: {
          matiereId,
          etudiantId,
        },
      },
      data: {
        absences: data.absences,
        noteCC: data.noteCC,
        noteSN: data.noteSN,
      },
    });
  }

  async getEtudiantNotes(matiereId: number, etudiantId: number) {
    return this.db.assMatiereEtudiant.findUnique({
      where: {
        matiereId_etudiantId: {
          matiereId,
          etudiantId,
        },
      },
      include: {
        matiere: true,
        etudiant: true,
      },
    });
  }
}
