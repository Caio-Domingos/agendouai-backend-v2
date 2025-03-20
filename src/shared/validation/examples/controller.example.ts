import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UserDto } from '../../database/examples/user.dto';
import { TransformInterceptor } from '../transform.interceptor';

/**
 * Este é um exemplo de como usar validação e transformação em controllers
 * Não é necessário usar este arquivo diretamente, mas serve como referência
 */
@Controller('users')
export class UsersExampleController {
  /**
   * Exemplo de validação de DTO e transformação de resposta
   */
  @Post()
  @UseInterceptors(new TransformInterceptor(UserDto))
  create(@Body() createUserDto: CreateUserDto) {
    // O createUserDto já está validado e transformado
    // O ValidationPipe global já aplicou todas as validações
    // O retorno será automaticamente transformado para UserDto
    return {
      id: 'new-uuid',
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Exemplo de validação de parâmetro de URL
   */
  @Get(':id')
  @UseInterceptors(new TransformInterceptor(UserDto))
  findOne(@Param('id') id: string) {
    // O id já está validado como uma string
    return {
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
