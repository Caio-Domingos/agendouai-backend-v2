import { Injectable } from '@nestjs/common';
import { CrudQueryService } from '../../shared/crud/services/crud-query.service';
import { UserEntity } from 'src/database/schemas/user/user.entity';
import {
  CreateUserDTO,
  UpdateUserDTO,
} from 'src/database/schemas/user/user.dto';
import { UserRepository } from 'src/database/schemas/user/user.repository';

@Injectable()
export class UserService extends CrudQueryService<
  UserEntity,
  CreateUserDTO,
  UpdateUserDTO
> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
  }

  // Métodos adicionais específicos para usuários podem ser implementados aqui

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
  async findByEmailWithPassword(email: string) {
    return this.userRepository.findByEmailWithPassword(email);
  }
}
