import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class EnregistrerAbsenceDto {
  @IsInt()
  @IsNotEmpty()
  etudiantId: number;

  @IsInt()
  @IsNotEmpty()
  matiereId: number;

  @IsInt()
  @IsOptional()
  nombreAbsences: number;
}
