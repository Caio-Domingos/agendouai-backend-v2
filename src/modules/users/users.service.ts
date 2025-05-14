import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { UserEntity } from 'src/database/schemas/users/users.entity';
import {
  CreateUserDTO,
  UpdateUserDTO,
} from 'src/database/schemas/users/users.dto';
import { UsersRepository } from 'src/database/schemas/users/users.repository';

@Injectable()
export class UsersService extends CrudQueryService<
  UserEntity,
  CreateUserDTO,
  UpdateUserDTO
> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

  findByEmailWithPassword(email: string) {
    return this.usersRepository.findByEmailWithPassword(email);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }
}
