import { Module } from '@nestjs/common';
import { AxeController } from './axe.controller';
import { AxeService } from './axe.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AxeController],
  providers: [AxeService],
  exports: [AxeService],
})
export class AxeModule {}
