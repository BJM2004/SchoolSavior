import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateSemestreDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  annee: string;

  @IsInt()
  @IsNotEmpty()
  departementId: number;
}
