import { Module } from '@nestjs/common';
import { DetteController } from './dette.controller';
import { DetteService } from './dette.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DetteController],
  providers: [DetteService],
  exports: [DetteService],
})
export class DetteModule {}
