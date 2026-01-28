import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateParentDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsString()
  @IsOptional()
  adresse?: string;

  @IsString()
  @IsOptional()
  profession?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
