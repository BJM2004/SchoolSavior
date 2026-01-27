import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class EnregistrerNoteDto {
  @IsInt()
  @IsNotEmpty()
  etudiantId: number;

  @IsInt()
  @IsNotEmpty()
  matiereId: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(20)
  noteCC?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(20)
  noteSN?: number;
}
