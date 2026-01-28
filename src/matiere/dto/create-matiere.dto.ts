import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateMatiereDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsInt()
  @IsNotEmpty()
  credit: number;

  @IsInt()
  @IsNotEmpty()
  semestreId: number;
}
