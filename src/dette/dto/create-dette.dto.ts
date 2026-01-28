import { StatutDette } from '@prisma/client';
import { IsNumber, IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateDetteDto {
  @IsNotEmpty()
  @IsString()
  libelle: string;
  @IsNumber()
  @IsNotEmpty()
  montant: number;
  @IsString()
  statut?: StatutDette;
  @IsNotEmpty()
  @IsInt()
  etudiantId: number;
}
