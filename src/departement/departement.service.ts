import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { Departement, Prisma } from '@prisma/client';

type DepartementWithRelations = Prisma.DepartementGetPayload<{
  include: { axes: true; etudiants: true; semestres: true };
}>;

@Injectable()
export class DepartementService {
  constructor(private readonly db: DatabaseService) {}

  async create(createDepartement: CreateDepartementDto): Promise<Departement> {
    return await this.db.departement.create({
      data: createDepartement,
    });
  }

  async findAll(): Promise<DepartementWithRelations[]> {
    return await this.db.departement.findMany({
      include: {
        axes: true,
        etudiants: true,
        semestres: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.db.departement.findUnique({
      where: { id },
      include: {
        axes: true,
        etudiants: true,
        semestres: true,
      },
    });
  }

  async update(
    id: number,
    updateDepartementDto: UpdateDepartementDto,
  ): Promise<Departement> {
    return await this.db.departement.update({
      where: { id },
      data: updateDepartementDto,
    });
  }

  async remove(id: number): Promise<Departement> {
    return await this.db.departement.delete({
      where: { id },
    });
  }
}
