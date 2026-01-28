import { Module } from '@nestjs/common';
import { ProfesseurService } from './professeur.service';
import { ProfesseurController } from './professeur.controller';
import { ProfesseurAuthController } from './professeur-auth.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'professeurSecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ProfesseurController, ProfesseurAuthController],
  providers: [ProfesseurService],
  exports: [ProfesseurService],
})
export class ProfesseurModule {}
