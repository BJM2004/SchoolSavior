import { Module } from '@nestjs/common';
import { PaiementController } from './paiement.controller';
import { PaiementService } from './paiement.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PaiementController],
  providers: [PaiementService],
  exports: [PaiementService],
})
export class PaiementModule {}
