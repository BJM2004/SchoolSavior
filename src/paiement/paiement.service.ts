import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';

@Injectable()
export class PaiementService {
  constructor(private readonly db: DatabaseService) {}

  async create(createPaiementDto: CreatePaiementDto) {
    return this.db.paiement.create({
      data: createPaiementDto,
    });
  }

  async findAll() {
    return await this.db.paiement.findMany();
  }

  async findOne(id: number) {
    return this.db.paiement.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePaiementDto: UpdatePaiementDto) {
    return this.db.paiement.update({
      where: { id },
      data: updatePaiementDto,
    });
  }

  async remove(id: number) {
    return this.db.paiement.delete({
      where: { id },
    });
  }
}
