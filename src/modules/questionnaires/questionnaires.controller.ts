import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { QuestionnaireEntity } from 'src/database/schemas/questionnaires/questionnaires.entity';
import {
  QuestionnaireDto,
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
} from 'src/database/schemas/questionnaires/questionnaires.dto';
import { QuestionnaireService } from './questionnaires.service';

// Criamos o controlador base usando a função factory
const QuestionnaireControllerBase = CrudQueryController<
  QuestionnaireEntity,
  typeof CreateQuestionnaireDTO,
  typeof UpdateQuestionnaireDTO,
  typeof QuestionnaireDto
>(
  'questionários',
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
  QuestionnaireDto,
);

@ApiTags('Questionários')
@Controller('questionnaires')
export class QuestionnaireController extends QuestionnaireControllerBase {
  constructor(readonly questionnaireService: QuestionnaireService) {
    super(questionnaireService);
  }
}
