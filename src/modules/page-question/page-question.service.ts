import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { PageQuestionEntity } from 'src/database/schemas/page-question/page-question.entity';
import {
  CreatePageQuestionDTO,
  UpdatePageQuestionDTO,
} from 'src/database/schemas/page-question/page-question.dto';
import { PageQuestionRepository } from 'src/database/schemas/page-question/page-question.repository';

@Injectable()
export class PageQuestionService extends CrudQueryService<
  PageQuestionEntity,
  CreatePageQuestionDTO,
  UpdatePageQuestionDTO
> {
  constructor(private pageQuestionRepository: PageQuestionRepository) {
    super(pageQuestionRepository);
  }
}
