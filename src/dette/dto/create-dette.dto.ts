import { StatutDette } from '@prisma/client';

export class CreateDetteDto {
  libelle: string;
  montant: number;
  statut?: StatutDette;
  etudiantId: number;
}
