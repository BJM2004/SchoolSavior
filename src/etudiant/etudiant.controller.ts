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
import { EtudiantService } from './etudiant.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';

@Controller('etudiants')
export class EtudiantController {
  constructor(private readonly etudiantService: EtudiantService) {}

  @Post()
  create(@Body() createEtudiantDto: CreateEtudiantDto) {
    return this.etudiantService.create(createEtudiantDto);
  }

  @Get()
  findAll() {
    return this.etudiantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.etudiantService.findOne(id);
  }

  @Get('matricule/:matricule')
  findByMatricule(@Param('matricule') matricule: string) {
    return this.etudiantService.findByMatricule(matricule);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEtudiantDto: UpdateEtudiantDto,
  ) {
    return this.etudiantService.update(id, updateEtudiantDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.etudiantService.remove(id);
  }
}
