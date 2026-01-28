import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
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

  @IsInt()
  @IsOptional()
  professeurId?: number;
}
