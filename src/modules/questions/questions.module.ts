import { Module } from '@nestjs/common';
import { QuestionService } from './questions.service';
import { QuestionController } from './questions.controller';
import { QuestionRepository } from 'src/database/schemas/questions/questions.repository';

@Module({
  exports: [QuestionService],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
})
export class QuestionModule {}
