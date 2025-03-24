import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { PageEntity } from 'src/database/schemas/pages/pages.entity';
import {
  CreatePageDTO,
  UpdatePageDTO,
} from 'src/database/schemas/pages/pages.dto';
import { PageRepository } from 'src/database/schemas/pages/pages.repository';

@Injectable()
export class PageService extends CrudQueryService<
  PageEntity,
  CreatePageDTO,
  UpdatePageDTO
> {
  constructor(private pageRepository: PageRepository) {
    super(pageRepository);
  }
}
