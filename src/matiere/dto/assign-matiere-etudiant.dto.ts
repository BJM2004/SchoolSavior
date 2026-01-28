import { IsNumber, IsOptional } from 'class-validator';
export class AssignMatiereEtudiantDto {
  @IsNumber()
  @IsOptional()
  absences?: number;

  @IsNumber()
  @IsOptional()
  noteCC?: number;

  @IsNumber()
  @IsOptional()
  noteSN?: number;
}
