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
import { ProfesseurService } from './professeur.service';
import { CreateProfesseurDto } from './dto/create-professeur.dto';
import { UpdateProfesseurDto } from './dto/update-professeur.dto';

@Controller('professeurs')
export class ProfesseurController {
  constructor(private readonly professeurService: ProfesseurService) {}

  @Post()
  create(@Body() createProfesseurDto: CreateProfesseurDto) {
    return this.professeurService.create(createProfesseurDto);
  }

  @Get()
  findAll() {
    return this.professeurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.professeurService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfesseurDto: UpdateProfesseurDto,
  ) {
    return this.professeurService.update(id, updateProfesseurDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.professeurService.remove(id);
  }
}
