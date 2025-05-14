import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { SpaceManagersEntity } from 'src/database/schemas/space-managers/space-managers.entity';
import {
  CreateSpaceManagersDTO,
  UpdateSpaceManagersDTO,
  SpaceManagersDto,
} from 'src/database/schemas/space-managers/space-managers.dto';
import { SpaceManagersService } from './space-managers.service';

// Criamos o controlador base usando a função factory
const SpaceManagersControllerBase = CrudQueryController<
  SpaceManagersEntity,
  typeof CreateSpaceManagersDTO,
  typeof UpdateSpaceManagersDTO,
  typeof SpaceManagersDto
>(
  'space-managers',
  CreateSpaceManagersDTO,
  UpdateSpaceManagersDTO,
  SpaceManagersDto,
);

@ApiTags('Responsáveis por Espaço')
@Controller('space-managers')
export class SpaceManagersController extends SpaceManagersControllerBase {
  constructor(readonly spaceManagersService: SpaceManagersService) {
    super(spaceManagersService);
  }
}
