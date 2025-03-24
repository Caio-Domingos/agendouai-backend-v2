import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { QuestionEntity } from 'src/database/schemas/questions/questions.entity';
import {
  CreateQuestionDTO,
  UpdateQuestionDTO,
} from 'src/database/schemas/questions/questions.dto';
import { QuestionRepository } from 'src/database/schemas/questions/questions.repository';

@Injectable()
export class QuestionService extends CrudQueryService<
  QuestionEntity,
  CreateQuestionDTO,
  UpdateQuestionDTO
> {
  constructor(private questionRepository: QuestionRepository) {
    super(questionRepository);
  }
}
