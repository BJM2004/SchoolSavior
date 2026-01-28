import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProfesseurDto } from './dto/create-professeur.dto';
import { UpdateProfesseurDto } from './dto/update-professeur.dto';
@Injectable()
export class ProfesseurService {
  constructor(private readonly db: DatabaseService) {}

  async create(createProfesseurDto: CreateProfesseurDto) {
    return await this.db.professeur.create({
      data: createProfesseurDto,
    });
  }

  async findAll() {
    return await this.db.professeur.findMany({
      include: {
        matieres: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.db.professeur.findUnique({
      where: { id },
      include: {
        matieres: true,
      },
    });
  }

  async update(id: number, updateProfesseurDto: UpdateProfesseurDto) {
    return await this.db.professeur.update({
      where: { id },
      data: updateProfesseurDto,
    });
  }

  async remove(id: number) {
    return await this.db.professeur.delete({
      where: { id },
    });
  }
}
