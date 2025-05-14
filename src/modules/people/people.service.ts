import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { PeopleEntity } from 'src/database/schemas/people/people.entity';
import {
  CreatePeopleDTO,
  UpdatePeopleDTO,
} from 'src/database/schemas/people/people.dto';
import { PeopleRepository } from 'src/database/schemas/people/people.repository';

@Injectable()
export class PeopleService extends CrudQueryService<
  PeopleEntity,
  CreatePeopleDTO,
  UpdatePeopleDTO
> {
  constructor(private peopleRepository: PeopleRepository) {
    super(peopleRepository);
  }
}
