export interface JwtPayload {
  sub: number;
  type: 'etudiant' | 'parent';
  matricule?: string;
  tel?: string;
  nom: string;
  prenom: string;
}

export interface AuthenticatedUser {
  id: number;
  type: 'etudiant' | 'parent';
  matricule?: string;
  tel?: string;
  nom: string;
  prenom: string;
}
