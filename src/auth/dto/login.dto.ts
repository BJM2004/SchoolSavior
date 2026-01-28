import { IsNotEmpty, IsString } from 'class-validator';

export class LoginEtudiantDto {
  @IsString()
  @IsNotEmpty()
  matricule: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginParentDto {
  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
