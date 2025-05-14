import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { UsersEntity } from 'src/database/schemas/users/users.entity';
import {
  CreateUsersDTO,
  UpdateUsersDTO,
} from 'src/database/schemas/users/users.dto';
import { UsersRepository } from 'src/database/schemas/users/users.repository';

@Injectable()
export class UsersService extends CrudQueryService<
  UsersEntity,
  CreateUsersDTO,
  UpdateUsersDTO
> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }
}
