import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateEtudiantDto {
  @IsString()
  @IsNotEmpty()
  matricule: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsOptional()
  tel?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDateString()
  @IsNotEmpty()
  dateNaissance: string;

  @IsInt()
  @IsNotEmpty()
  axeId: number;

  @IsInt()
  @IsNotEmpty()
  departementId: number;

  @IsInt()
  @IsNotEmpty()
  promotionId: number;
}
