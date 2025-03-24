import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { AnswerEntity } from 'src/database/schemas/answers/answers.entity';
import {
  CreateAnswerDTO,
  UpdateAnswerDTO,
} from 'src/database/schemas/answers/answers.dto';
import { AnswerRepository } from 'src/database/schemas/answers/answers.repository';

@Injectable()
export class AnswerService extends CrudQueryService<
  AnswerEntity,
  CreateAnswerDTO,
  UpdateAnswerDTO
> {
  constructor(private answerRepository: AnswerRepository) {
    super(answerRepository);
  }
}
