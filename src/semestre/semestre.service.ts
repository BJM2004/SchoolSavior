import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';
import { Semestre } from '@prisma/client';

@Injectable()
export class SemestreService {
  constructor(private readonly db: DatabaseService) {}

  async create(createSemestre: CreateSemestreDto): Promise<Semestre> {
    return await this.db.semestre.create({
      data: createSemestre,
    });
  }

  async findAll(): Promise<Semestre[]> {
    return await this.db.semestre.findMany({
      include: {
        departement: true,
        matieres: true,
        etudiants: {
          include: { etudiant: true },
        },
      },
    });
  }

  async findOne(id: number): Promise<any> {
    return await this.db.semestre.findUnique({
      where: { id },
      include: {
        departement: true,
        matieres: true,
        etudiants: {
          include: { etudiant: true },
        },
      },
    });
  }

  async update(
    id: number,
    updateSemestre: UpdateSemestreDto,
  ): Promise<Semestre> {
    return await this.db.semestre.update({
      where: { id },
      data: { ...updateSemestre },
    });
  }

  async remove(id: number): Promise<Semestre> {
    return await this.db.semestre.delete({
      where: { id },
    });
  }
}
