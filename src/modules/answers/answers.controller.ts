import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { AnswerEntity } from 'src/database/schemas/answers/answers.entity';
import {
  CreateAnswerDTO,
  AnswerDto,
  UpdateAnswerDTO,
} from 'src/database/schemas/answers/answers.dto';
import { AnswerService } from './answers.service';

// Criamos o controlador base usando a função factory
const AnswerControllerBase = CrudQueryController<
  AnswerEntity,
  typeof CreateAnswerDTO,
  typeof UpdateAnswerDTO,
  typeof AnswerDto
>('answers', CreateAnswerDTO, UpdateAnswerDTO, AnswerDto);

@ApiTags('Respostas')
@Controller('answers')
export class AnswerController extends AnswerControllerBase {
  constructor(readonly answerService: AnswerService) {
    super(answerService);
  }
}
