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
import { DetteService } from './dette.service';
import { CreateDetteDto } from './dto/create-dette.dto';
import { UpdateDetteDto } from './dto/update-dette.dto';

@Controller('dettes')
export class DetteController {
  constructor(private readonly detteService: DetteService) {}

  @Post()
  create(@Body() createDetteDto: CreateDetteDto) {
    return this.detteService.create(createDetteDto);
  }

  @Get()
  findAll() {
    return this.detteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detteService.findOne(id);
  }

  @Get('etudiant/:etudiantId')
  findByEtudiant(@Param('etudiantId', ParseIntPipe) etudiantId: number) {
    return this.detteService.findByEtudiant(etudiantId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetteDto: UpdateDetteDto,
  ) {
    return this.detteService.update(id, updateDetteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detteService.remove(id);
  }
}
