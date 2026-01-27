import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MatiereService } from './matiere.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { AssignMatiereEtudiantDto } from './dto/assign-matiere-etudiant.dto';

@Controller('matieres')
export class MatiereController {
  constructor(private readonly matiereService: MatiereService) {}

  @Post()
  create(@Body() createMatiereDto: CreateMatiereDto) {
    return this.matiereService.create(createMatiereDto);
  }

  @Get()
  findAll() {
    return this.matiereService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matiereService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatiereDto: UpdateMatiereDto,
  ) {
    return this.matiereService.update(id, updateMatiereDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matiereService.remove(id);
  }

  @Post(':matiereId/etudiants/:etudiantId')
  assignToEtudiant(
    @Param('matiereId', ParseIntPipe) matiereId: number,
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
  ) {
    return this.matiereService.assignToEtudiant(matiereId, etudiantId);
  }

  @Delete(':matiereId/etudiants/:etudiantId')
  unassignFromEtudiant(
    @Param('matiereId', ParseIntPipe) matiereId: number,
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
  ) {
    return this.matiereService.unassignFromEtudiant(matiereId, etudiantId);
  }

  @Patch(':matiereId/etudiants/:etudiantId/notes')
  updateNotesAndAbsences(
    @Param('matiereId', ParseIntPipe) matiereId: number,
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
    @Body() data: AssignMatiereEtudiantDto,
  ) {
    return this.matiereService.updateNotesAndAbsences(
      matiereId,
      etudiantId,
      data,
    );
  }

  @Get(':matiereId/etudiants/:etudiantId/notes')
  getEtudiantNotes(
    @Param('matiereId', ParseIntPipe) matiereId: number,
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
  ) {
    return this.matiereService.getEtudiantNotes(matiereId, etudiantId);
  }
}
