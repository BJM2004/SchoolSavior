export class CreateEtudiantDto {
  matricule: string;
  nom: string;
  prenom: string;
  tel?: string;
  password: string;
  dateNaissance: Date;
  axeId: number;
  departementId: number;
  promotionId: number;
}
