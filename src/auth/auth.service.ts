import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { LoginEtudiantDto, LoginParentDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  // ==================== ETUDIANT ====================

  async loginEtudiant(dto: LoginEtudiantDto) {
    const etudiant = await this.db.etudiant.findUnique({
      where: { matricule: dto.matricule },
      include: {
        departement: true,
        axe: true,
        promotion: true,
      },
    });

    if (!etudiant) {
      throw new UnauthorizedException('Matricule ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      etudiant.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Matricule ou mot de passe incorrect');
    }

    const payload: JwtPayload = {
      sub: etudiant.id,
      type: 'etudiant',
      matricule: etudiant.matricule,
      nom: etudiant.nom,
      prenom: etudiant.prenom,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: etudiant.id,
        matricule: etudiant.matricule,
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        tel: etudiant.tel,
        dateNaissance: etudiant.dateNaissance,
        dateInscription: etudiant.dateInscription,
        departement: etudiant.departement.nom,
        axe: etudiant.axe.nom,
        promotion: etudiant.promotion.annee,
        type: 'etudiant',
      },
    };
  }

  // ==================== PARENT ====================

  async loginParent(dto: LoginParentDto) {
    const parent = await this.db.parent.findFirst({
      where: { tel: dto.tel },
      include: {
        etudiants: {
          include: {
            etudiant: {
              select: {
                id: true,
                matricule: true,
                nom: true,
                prenom: true,
              },
            },
          },
        },
      },
    });

    if (!parent) {
      throw new UnauthorizedException('Téléphone ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, parent.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Téléphone ou mot de passe incorrect');
    }

    const payload: JwtPayload = {
      sub: parent.id,
      type: 'parent',
      tel: parent.tel ?? undefined,
      nom: parent.nom,
      prenom: parent.prenom,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: parent.id,
        nom: parent.nom,
        prenom: parent.prenom,
        tel: parent.tel,
        adresse: parent.adresse,
        profession: parent.profession,
        enfants: parent.etudiants.map((e) => e.etudiant),
        type: 'parent',
      },
    };
  }

  // ==================== UTILS ====================

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async validateToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }

  async getProfile(userId: number, userType: 'etudiant' | 'parent') {
    if (userType === 'etudiant') {
      return this.db.etudiant.findUnique({
        where: { id: userId },
        include: {
          departement: true,
          axe: true,
          promotion: true,
          matieres: {
            include: { matiere: true },
          },
          dettes: true,
        },
      });
    }

    return this.db.parent.findUnique({
      where: { id: userId },
      include: {
        etudiants: {
          include: {
            etudiant: {
              include: {
                departement: true,
                axe: true,
                promotion: true,
              },
            },
          },
        },
      },
    });
  }
}
