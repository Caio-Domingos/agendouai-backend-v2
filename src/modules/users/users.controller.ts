import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { UserEntity } from 'src/database/schemas/users/users.entity';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserDto,
} from 'src/database/schemas/users/users.dto';
import { UsersService } from './users.service';

// Criamos o controlador base usando a função factory
const UsersControllerBase = CrudQueryController<
  UserEntity,
  typeof CreateUserDTO,
  typeof UpdateUserDTO,
  typeof UserDto
>('users', CreateUserDTO, UpdateUserDTO, UserDto);

@ApiTags('Usuários')
@Controller('users')
export class UsersController extends UsersControllerBase {
  constructor(readonly usersService: UsersService) {
    super(usersService);
  }
}
