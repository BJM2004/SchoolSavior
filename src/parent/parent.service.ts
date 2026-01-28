import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ParentService {
  constructor(private readonly db: DatabaseService) {}

  async create(createParentDto: CreateParentDto) {
    const hashedPassword = await bcrypt.hash(createParentDto.password, 10);
    return this.db.parent.create({
      data: {
        ...createParentDto,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return await this.db.parent.findMany({
      include: {
        etudiants: {
          include: { etudiant: true },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.db.parent.findUnique({
      where: { id },
      include: {
        etudiants: {
          include: { etudiant: true },
        },
      },
    });
  }

  async update(id: number, updateParentDto: UpdateParentDto) {
    return await this.db.parent.update({
      where: { id },
      data: updateParentDto,
    });
  }

  async remove(id: number) {
    return this.db.parent.delete({
      where: { id },
    });
  }

  async linkToEtudiant(parentId: number, etudiantId: number) {
    return this.db.assEtudiantParent.create({
      data: {
        parentId,
        etudiantId,
      },
    });
  }

  async unlinkFromEtudiant(parentId: number, etudiantId: number) {
    return this.db.assEtudiantParent.delete({
      where: {
        etudiantId_parentId: {
          etudiantId,
          parentId,
        },
      },
    });
  }
}
