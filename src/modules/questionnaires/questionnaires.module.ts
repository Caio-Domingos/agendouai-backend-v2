import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaires.service';
import { QuestionnaireController } from './questionnaires.controller';
import { QuestionnaireRepository } from 'src/database/schemas/questionnaires/questionnaires.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireEntity } from 'src/database/schemas/questionnaires/questionnaires.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity])],
  exports: [QuestionnaireService],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService, QuestionnaireRepository],
})
export class QuestionnaireModule {}
