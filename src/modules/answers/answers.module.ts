import { Module } from '@nestjs/common';
import { AnswerService } from './answers.service';
import { AnswerController } from './answers.controller';
import { AnswerRepository } from 'src/database/schemas/answers/answers.repository';

@Module({
  exports: [AnswerService],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository],
})
export class AnswerModule {}
