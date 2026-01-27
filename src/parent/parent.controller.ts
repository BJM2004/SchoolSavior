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
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';

@Controller('parents')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  create(@Body() createParentDto: CreateParentDto) {
    return this.parentService.create(createParentDto);
  }

  @Get()
  findAll() {
    return this.parentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParentDto: UpdateParentDto,
  ) {
    return this.parentService.update(id, updateParentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parentService.remove(id);
  }

  @Post(':parentId/etudiants/:etudiantId')
  linkToEtudiant(
    @Param('parentId', ParseIntPipe) parentId: number,
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
  ) {
    return this.parentService.linkToEtudiant(parentId, etudiantId);
  }

  @Delete(':parentId/etudiants/:etudiantId')
  unlinkFromEtudiant(
    @Param('parentId', ParseIntPipe) parentId: number,
    @Param('etudiantId', ParseIntPipe) etudiantId: number,
  ) {
    return this.parentService.unlinkFromEtudiant(parentId, etudiantId);
  }
}
