import { PartialType } from '@nestjs/mapped-types';
import { CreateDetteDto } from './create-dette.dto';

export class UpdateDetteDto extends PartialType(CreateDetteDto) {}
