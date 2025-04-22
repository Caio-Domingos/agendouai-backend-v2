import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CrudQueryController } from '../../shared/crud/controllers/crud-query.controller';
import { UserEntity } from 'src/database/schemas/user/user.entity';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserDto,
} from 'src/database/schemas/user/user.dto';

// Criamos o controlador base usando a função factory
const UserControllerBase = CrudQueryController<
  UserEntity, // Tipo da entidade
  typeof CreateUserDTO, // Tipo do DTO de criação
  typeof UpdateUserDTO, // Tipo do DTO de atualização
  typeof UserDto // Tipo do DTO de resposta
>(
  'users', // Nome da entidade para mensagens e documentação
  CreateUserDTO, // Classe do DTO de criação
  UpdateUserDTO, // Classe do DTO de atualização
  UserDto, // Classe do DTO de resposta
);

// Aplicamos os decoradores específicos deste controller
@ApiTags('Usuários')
@Controller('users')
export class UserController extends UserControllerBase {
  constructor(readonly userService: UserService) {
    // Passamos o serviço para o construtor da classe base
    super(userService);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDto> {
    // Implementação específica para criar um usuário
    throw new BadRequestException(
      'Este endpoint não deve ser usado diretamente. Use o endpoint de registro.',
    );
  }
}
