import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { SpacesEntity } from 'src/database/schemas/spaces/spaces.entity';
import {
  CreateSpacesDTO,
  UpdateSpacesDTO,
} from 'src/database/schemas/spaces/spaces.dto';
import { SpacesRepository } from 'src/database/schemas/spaces/spaces.repository';

@Injectable()
export class SpacesService extends CrudQueryService<
  SpacesEntity,
  CreateSpacesDTO,
  UpdateSpacesDTO
> {
  constructor(private spacesRepository: SpacesRepository) {
    super(spacesRepository);
  }
}
