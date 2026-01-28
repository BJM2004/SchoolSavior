import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfesseurDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsString()
  @IsNotEmpty()
  tel?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
