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
import { AxeService } from './axe.service';
import { CreateAxeDto } from './dto/create-axe.dto';
import { UpdateAxeDto } from './dto/update-axe.dto';

@Controller('axes')
export class AxeController {
  constructor(private readonly axeService: AxeService) {}

  @Post()
  create(@Body() createAxeDto: CreateAxeDto) {
    return this.axeService.create(createAxeDto);
  }

  @Get()
  findAll() {
    return this.axeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.axeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAxeDto: UpdateAxeDto,
  ) {
    return this.axeService.update(id, updateAxeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.axeService.remove(id);
  }
}
