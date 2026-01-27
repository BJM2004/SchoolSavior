import { PartialType } from '@nestjs/mapped-types';
import { CreateAxeDto } from './create-axe.dto';

export class UpdateAxeDto extends PartialType(CreateAxeDto) {}
