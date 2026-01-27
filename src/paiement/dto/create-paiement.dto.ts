import { StatutPaiement } from '@prisma/client';

export class CreatePaiementDto {
  libelle: string;
  montant: number;
  statut?: StatutPaiement;
}
