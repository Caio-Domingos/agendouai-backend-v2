import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { QuestionEntity } from 'src/database/schemas/questions/questions.entity';
import {
  CreateQuestionDTO,
  QuestionDto,
  UpdateQuestionDTO,
} from 'src/database/schemas/questions/questions.dto';
import { QuestionService } from './questions.service';

// Criamos o controlador base usando a função factory
const QuestionControllerBase = CrudQueryController<
  QuestionEntity,
  typeof CreateQuestionDTO,
  typeof UpdateQuestionDTO,
  typeof QuestionDto
>('questions', CreateQuestionDTO, UpdateQuestionDTO, QuestionDto);

@ApiTags('Questões')
@Controller('questions')
export class QuestionController extends QuestionControllerBase {
  constructor(readonly questionService: QuestionService) {
    super(questionService);
  }
}
