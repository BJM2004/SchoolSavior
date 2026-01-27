import { Module } from '@nestjs/common';
import { SemestreController } from './semestre.controller';
import { SemestreService } from './semestre.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SemestreController],
  providers: [SemestreService],
  exports: [SemestreService],
})
export class SemestreModule {}
