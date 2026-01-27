import { Module } from '@nestjs/common';
import { EtudiantController } from './etudiant.controller';
import { EtudiantService } from './etudiant.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EtudiantController],
  providers: [EtudiantService],
  exports: [EtudiantService],
})
export class EtudiantModule {}
