import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { PeopleEntity } from 'src/database/schemas/people/people.entity';
import {
  CreatePeopleDTO,
  UpdatePeopleDTO,
  PeopleDto,
} from 'src/database/schemas/people/people.dto';
import { PeopleService } from './people.service';

// Criamos o controlador base usando a função factory
const PeopleControllerBase = CrudQueryController<
  PeopleEntity,
  typeof CreatePeopleDTO,
  typeof UpdatePeopleDTO,
  typeof PeopleDto
>('people', CreatePeopleDTO, UpdatePeopleDTO, PeopleDto);

@ApiTags('Pessoas')
@Controller('people')
export class PeopleController extends PeopleControllerBase {
  constructor(readonly peopleService: PeopleService) {
    super(peopleService);
  }
}
