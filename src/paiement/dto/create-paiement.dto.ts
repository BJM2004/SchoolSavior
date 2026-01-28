import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { StatutPaiement } from '@prisma/client';
export class CreatePaiementDto {
  @IsString()
  @IsNotEmpty()
  libelle: string;
  @IsNumber()
  @IsNotEmpty()
  montant: number;
  @IsString()
  @IsNotEmpty()
  statut?: StatutPaiement;
}
