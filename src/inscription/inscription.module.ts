import { Module } from '@nestjs/common';
import { InscriptionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InscriptionController],
  providers: [InscriptionService],
  exports: [InscriptionService],
})
export class InscriptionModule {}
