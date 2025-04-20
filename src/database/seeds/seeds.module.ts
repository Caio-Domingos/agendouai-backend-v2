import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';

import { DatabaseCleanService } from '../clean/database-clean.service';
import { UserEntity } from '../schemas/user/user.entity';
import { QuestionEntity } from '../schemas/questions/questions.entity';
import { PageEntity } from '../schemas/pages/pages.entity';
import { PageQuestionEntity } from '../schemas/page-question/page-question.entity';
import { QuestionnaireEntity } from '../schemas/questionnaires/questionnaires.entity';
import { SubmissionEntity } from '../schemas/submissions/submissions.entity';
import { AnswerEntity } from '../schemas/answers/answers.entity';
import { AlertEntity } from '../schemas/alerts/alerts.entity';
import { CompanyEntity } from '../schemas/companies/companies.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      QuestionEntity,
      PageEntity,
      PageQuestionEntity,
      QuestionnaireEntity,
      SubmissionEntity,
      AnswerEntity,
      AlertEntity,
      CompanyEntity,
    ]),
    ConfigModule,
  ],
  providers: [SeedsService, DatabaseCleanService],
  controllers: [SeedsController],
  exports: [SeedsService, DatabaseCleanService],
})
export class SeedsModule {}
