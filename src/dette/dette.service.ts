import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateDetteDto } from './dto/create-dette.dto';
import { UpdateDetteDto } from './dto/update-dette.dto';

@Injectable()
export class DetteService {
  constructor(private readonly db: DatabaseService) {}

  async create(createDetteDto: CreateDetteDto) {
    return this.db.dette.create({
      data: createDetteDto,
    });
  }

  async findAll() {
    return await this.db.dette.findMany({
      include: {
        etudiant: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.db.dette.findUnique({
      where: { id },
      include: {
        etudiant: true,
      },
    });
  }

  async findByEtudiant(etudiantId: number) {
    return await this.db.dette.findMany({
      where: { etudiantId },
      include: {
        etudiant: true,
      },
    });
  }

  async update(id: number, updateDetteDto: UpdateDetteDto) {
    return await this.db.dette.update({
      where: { id },
      data: updateDetteDto,
    });
  }

  async remove(id: number) {
    return this.db.dette.delete({
      where: { id },
    });
  }
}
