import { IsInt, IsOptional } from 'class-validator';
export class AssignMatiereEtudiantDto {
  @IsInt()
  @IsOptional()
  absences?: number;

  @IsInt()
  @IsOptional()
  noteCC?: number;

  @IsInt()
  @IsOptional()
  noteSN?: number;
}
