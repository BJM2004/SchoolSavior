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
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';

@Controller('departements')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}

  @Post()
  create(@Body() createDepartement: CreateDepartementDto) {
    return this.departementService.create(createDepartement);
  }

  @Get()
  findAll() {
    return this.departementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartementDto: UpdateDepartementDto,
  ) {
    return this.departementService.update(id, updateDepartementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departementService.remove(id);
  }
}
