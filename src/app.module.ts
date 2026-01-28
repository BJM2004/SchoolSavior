import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PromotionModule } from './promotion/promotion.module';
import { DepartementModule } from './departement/departement.module';
import { AxeModule } from './axe/axe.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { ParentModule } from './parent/parent.module';
import { SemestreModule } from './semestre/semestre.module';
import { MatiereModule } from './matiere/matiere.module';
import { DetteModule } from './dette/dette.module';
import { PaiementModule } from './paiement/paiement.module';
import { InscriptionModule } from './inscription/inscription.module';
import { AuthModule } from './auth/auth.module';
import { ProfesseurModule } from './professeur/professeur.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PromotionModule,
    DepartementModule,
    AxeModule,
    EtudiantModule,
    ParentModule,
    SemestreModule,
    MatiereModule,
    DetteModule,
    PaiementModule,
    InscriptionModule,
    ProfesseurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
