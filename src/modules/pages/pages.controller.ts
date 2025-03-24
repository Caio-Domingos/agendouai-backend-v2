import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { PageEntity } from 'src/database/schemas/pages/pages.entity';
import {
  CreatePageDTO,
  PageDto,
  UpdatePageDTO,
} from 'src/database/schemas/pages/pages.dto';
import { PageService } from './pages.service';

// Criamos o controlador base usando a função factory
const PageControllerBase = CrudQueryController<
  PageEntity,
  typeof CreatePageDTO,
  typeof UpdatePageDTO,
  typeof PageDto
>('pages', CreatePageDTO, UpdatePageDTO, PageDto);

@ApiTags('Páginas')
@Controller('pages')
export class PageController extends PageControllerBase {
  constructor(readonly pageService: PageService) {
    super(pageService);
  }
}
