import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { SpaceManagersEntity } from 'src/database/schemas/space-managers/space-managers.entity';
import {
  CreateSpaceManagersDTO,
  UpdateSpaceManagersDTO,
} from 'src/database/schemas/space-managers/space-managers.dto';
import { SpaceManagersRepository } from 'src/database/schemas/space-managers/space-managers.repository';

@Injectable()
export class SpaceManagersService extends CrudQueryService<
  SpaceManagersEntity,
  CreateSpaceManagersDTO,
  UpdateSpaceManagersDTO
> {
  constructor(private spaceManagersRepository: SpaceManagersRepository) {
    super(spaceManagersRepository);
  }
}
