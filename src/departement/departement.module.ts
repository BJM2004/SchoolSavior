import { Module } from '@nestjs/common';
import { DepartementController } from './departement.controller';
import { DepartementService } from './departement.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartementController],
  providers: [DepartementService],
  exports: [DepartementService],
})
export class DepartementModule {}
