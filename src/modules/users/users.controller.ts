import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { UsersEntity } from 'src/database/schemas/users/users.entity';
import {
  CreateUsersDTO,
  UpdateUsersDTO,
  UsersDto,
} from 'src/database/schemas/users/users.dto';
import { UsersService } from './users.service';

// Criamos o controlador base usando a função factory
const UsersControllerBase = CrudQueryController<
  UsersEntity,
  typeof CreateUsersDTO,
  typeof UpdateUsersDTO,
  typeof UsersDto
>('users', CreateUsersDTO, UpdateUsersDTO, UsersDto);

@ApiTags('Usuários')
@Controller('users')
export class UsersController extends UsersControllerBase {
  constructor(readonly usersService: UsersService) {
    super(usersService);
  }
}
