import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { QuestionnaireEntity } from 'src/database/schemas/questionnaires/questionnaires.entity';
import {
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
} from 'src/database/schemas/questionnaires/questionnaires.dto';
import { QuestionnaireRepository } from 'src/database/schemas/questionnaires/questionnaires.repository';

@Injectable()
export class QuestionnaireService extends CrudQueryService<
  QuestionnaireEntity,
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO
> {
  constructor(private questionnaireRepository: QuestionnaireRepository) {
    super(questionnaireRepository);
  }
}
