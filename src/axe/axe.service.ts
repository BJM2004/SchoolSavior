import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateAxeDto } from './dto/create-axe.dto';
import { UpdateAxeDto } from './dto/update-axe.dto';

@Injectable()
export class AxeService {
  constructor(private readonly db: DatabaseService) {}

  async create(createAxeDto: CreateAxeDto) {
    return this.db.axe.create({
      data: createAxeDto,
    });
  }

  async findAll() {
    return await this.db.axe.findMany({
      include: {
        departement: true,
        etudiants: true,
      },
    });
  }

  async findOne(id: number) {
    return this.db.axe.findUnique({
      where: { id },
      include: {
        departement: true,
        etudiants: true,
      },
    });
  }

  async update(id: number, updateAxeDto: UpdateAxeDto) {
    return await this.db.axe.update({
      where: { id },
      data: updateAxeDto,
    });
  }

  async remove(id: number) {
    return this.db.axe.delete({
      where: { id },
    });
  }
}
