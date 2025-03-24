import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { PageQuestionEntity } from 'src/database/schemas/page-question/page-question.entity';
import {
  CreatePageQuestionDTO,
  PageQuestionDto,
  UpdatePageQuestionDTO,
} from 'src/database/schemas/page-question/page-question.dto';
import { PageQuestionService } from './page-question.service';

// Criamos o controlador base usando a função factory
const PageQuestionControllerBase = CrudQueryController<
  PageQuestionEntity,
  typeof CreatePageQuestionDTO,
  typeof UpdatePageQuestionDTO,
  typeof PageQuestionDto
>(
  'page_questions',
  CreatePageQuestionDTO,
  UpdatePageQuestionDTO,
  PageQuestionDto,
);

@ApiTags('Questões da Página')
@Controller('page-questions')
export class PageQuestionController extends PageQuestionControllerBase {
  constructor(readonly pageQuestionService: PageQuestionService) {
    super(pageQuestionService);
  }
}
