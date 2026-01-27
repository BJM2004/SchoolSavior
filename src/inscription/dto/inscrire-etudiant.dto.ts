import { IsInt, IsNotEmpty } from 'class-validator';

export class InscrireEtudiantDto {
  @IsInt()
  @IsNotEmpty()
  etudiantId: number;

  @IsInt()
  @IsNotEmpty()
  matiereId: number;
}
