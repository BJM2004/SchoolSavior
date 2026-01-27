import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class EnregistrerAbsenceDto {
  @IsInt()
  @IsNotEmpty()
  etudiantId: number;

  @IsInt()
  @IsNotEmpty()
  matiereId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  nombreAbsences: number;
}
