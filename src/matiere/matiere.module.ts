import { Module } from '@nestjs/common';
import { MatiereController } from './matiere.controller';
import { MatiereService } from './matiere.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MatiereController],
  providers: [MatiereService],
  exports: [MatiereService],
})
export class MatiereModule {}
