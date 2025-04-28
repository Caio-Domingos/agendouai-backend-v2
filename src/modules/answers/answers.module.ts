import { Module } from '@nestjs/common';
import { AnswerService } from './answers.service';
import { AnswerController } from './answers.controller';
import { AnswerRepository } from 'src/database/schemas/answers/answers.repository';
import { PageQuestionModule } from '../page-question/page-question.module';
import { AlertModule } from '../alerts/alerts.module';

@Module({
  exports: [AnswerService],
  imports: [
    // TODO: Pass this to event emitter later
    PageQuestionModule,
    AlertModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository],
})
export class AnswerModule {}
