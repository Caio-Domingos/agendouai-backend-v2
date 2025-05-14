import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { SpacesEntity } from 'src/database/schemas/spaces/spaces.entity';
import {
  CreateSpacesDTO,
  UpdateSpacesDTO,
  SpacesDto,
} from 'src/database/schemas/spaces/spaces.dto';
import { SpacesService } from './spaces.service';

// Criamos o controlador base usando a função factory
const SpacesControllerBase = CrudQueryController<
  SpacesEntity,
  typeof CreateSpacesDTO,
  typeof UpdateSpacesDTO,
  typeof SpacesDto
>('spaces', CreateSpacesDTO, UpdateSpacesDTO, SpacesDto);

@ApiTags('Espaços')
@Controller('spaces')
export class SpacesController extends SpacesControllerBase {
  constructor(readonly spacesService: SpacesService) {
    super(spacesService);
  }
}
