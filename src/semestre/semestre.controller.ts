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
import { SemestreService } from './semestre.service';
import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';

@Controller('semestres')
export class SemestreController {
  constructor(private readonly semestreService: SemestreService) {}

  @Post()
  create(@Body() createSemestreDto: CreateSemestreDto) {
    return this.semestreService.create(createSemestreDto);
  }

  @Get()
  findAll() {
    return this.semestreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.semestreService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSemestreDto: UpdateSemestreDto,
  ) {
    return this.semestreService.update(id, updateSemestreDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.semestreService.remove(id);
  }
}
