import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('professeurs/auth')
export class ProfesseurAuthController {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: { nom: string; password: string }) {
    const professeur = await this.db.professeur.findFirst({
      where: { nom: body.nom },
    });
    if (!professeur)
      throw new UnauthorizedException('Nom ou mot de passe incorrect');
    const valid = await bcrypt.compare(body.password, professeur.password);
    if (!valid)
      throw new UnauthorizedException('Nom ou mot de passe incorrect');
    const payload = {
      sub: professeur.id,
      nom: professeur.nom,
      type: 'professeur',
    };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  @Post('logout')
  logout() {
    // Pour JWT stateless, la déconnexion se fait côté client (suppression du token)
    return { message: 'Déconnexion réussie (supprimez le token côté client)' };
  }
}
