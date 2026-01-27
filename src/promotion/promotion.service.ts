import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionService {
  constructor(private readonly db: DatabaseService) {}

  async create(createPromotionDto: CreatePromotionDto) {
    return this.db.promotion.create({
      data: createPromotionDto,
    });
  }

  async findAll() {
    return this.db.promotion.findMany({
      include: { etudiants: true },
    });
  }

  async findOne(id: number) {
    return this.db.promotion.findUnique({
      where: { id },
      include: { etudiants: true },
    });
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return this.db.promotion.update({
      where: { id },
      data: updatePromotionDto,
    });
  }

  async remove(id: number) {
    return this.db.promotion.delete({
      where: { id },
    });
  }
}
