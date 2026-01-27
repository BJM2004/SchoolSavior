import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';

@Injectable()
export class EtudiantService {
  constructor(private readonly db: DatabaseService) {}

  async create(createEtudiantDto: CreateEtudiantDto) {
    return await this.db.etudiant.create({
      data: createEtudiantDto,
    });
  }

  async findAll() {
    return await this.db.etudiant.findMany({
      include: {
        axe: true,
        departement: true,
        promotion: true,
        parents: {
          include: { parent: true },
        },
        matieres: {
          include: { matiere: true },
        },
        dettes: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.db.etudiant.findUnique({
      where: { id },
      include: {
        axe: true,
        departement: true,
        promotion: true,
        parents: {
          include: { parent: true },
        },
        matieres: {
          include: { matiere: true },
        },
        dettes: true,
      },
    });
  }

  async findByMatricule(matricule: string) {
    return await this.db.etudiant.findUnique({
      where: { matricule },
      include: {
        axe: true,
        departement: true,
        promotion: true,
        parents: {
          include: { parent: true },
        },
        matieres: {
          include: { matiere: true },
        },
        dettes: true,
      },
    });
  }

  async update(id: number, updateEtudiantDto: UpdateEtudiantDto) {
    return await this.db.etudiant.update({
      where: { id },
      data: updateEtudiantDto,
    });
  }

  async remove(id: number) {
    return this.db.etudiant.delete({
      where: { id },
    });
  }
}
