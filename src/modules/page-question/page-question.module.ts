import { Module } from '@nestjs/common';
import { PageQuestionService } from './page-question.service';
import { PageQuestionController } from './page-question.controller';
import { PageQuestionRepository } from 'src/database/schemas/page-question/page-question.repository';

@Module({
  exports: [PageQuestionService],
  controllers: [PageQuestionController],
  providers: [PageQuestionService, PageQuestionRepository],
})
export class PageQuestionModule {}
