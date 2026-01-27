import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import {
  InscrireEtudiantDto,
  EnregistrerNoteDto,
  EnregistrerAbsenceDto,
} from './dto';

@Controller('inscriptions')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  // ==================== INSCRIPTION ====================

  @Post()
  inscrire(@Body() dto: InscrireEtudiantDto) {
    return this.inscriptionService.inscrireEtudiant(dto);
  }

  @Delete(':etudiantId/:matiereId')
  desinscrire(
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
    @Param('matiereId', ParseIntPipe) matiereId: number,
  ) {
    return this.inscriptionService.desinscrireEtudiant(etudiantId, matiereId);
  }

  @Get('etudiant/:etudiantId')
  getInscriptionsEtudiant(
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
  ) {
    return this.inscriptionService.getInscriptionsEtudiant(etudiantId);
  }

  // ==================== NOTES ====================

  @Patch('notes')
  enregistrerNote(@Body() dto: EnregistrerNoteDto) {
    return this.inscriptionService.enregistrerNote(dto);
  }

  @Get('notes/:etudiantId/:matiereId')
  getNoteMatiere(
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
    @Param('matiereId', ParseIntPipe) matiereId: number,
  ) {
    return this.inscriptionService.getNoteMatiere(etudiantId, matiereId);
  }

  // ==================== ABSENCES ====================

  @Patch('absences')
  enregistrerAbsence(@Body() dto: EnregistrerAbsenceDto) {
    return this.inscriptionService.enregistrerAbsence(dto);
  }

  @Patch('absences/reset/:etudiantId/:matiereId')
  reinitialiserAbsences(
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
    @Param('matiereId', ParseIntPipe) matiereId: number,
  ) {
    return this.inscriptionService.reinitialiserAbsences(etudiantId, matiereId);
  }

  // ==================== CALCULS / BULLETINS ====================

  @Get('moyenne/:etudiantId/semestre/:semestreId')
  getMoyenneSemestre(
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
    @Param('semestreId', ParseIntPipe) semestreId: number,
  ) {
    return this.inscriptionService.getMoyenneSemestre(etudiantId, semestreId);
  }

  @Get('bulletin/:etudiantId')
  getBulletinEtudiant(@Param('etudiantId', ParseIntPipe) etudiantId: number) {
    return this.inscriptionService.getBulletinEtudiant(etudiantId);
  }

  @Get('risque/semestre/:semestreId')
  getEtudiantsARisque(@Param('semestreId', ParseIntPipe) semestreId: number) {
    return this.inscriptionService.getEtudiantsARisque(semestreId);
  }
}
