import { Body, Controller, Post, Query, Get } from '@nestjs/common';
import { ParseArrayPipe } from '@nestjs/common';
import { CreateUserDto } from '../../database/examples/user.dto';

/**
 * Este é um exemplo de como validar arrays de DTOs e parâmetros
 * Não é necessário usar este arquivo diretamente, mas serve como referência
 */
@Controller('examples/validation')
export class ValidationExampleController {
  /**
   * Exemplo de validação de um array de DTOs no body da requisição
   */
  @Post('bulk-users')
  createBulkUsers(
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    createUserDtos: CreateUserDto[],
  ) {
    return {
      message: 'Usuários recebidos com sucesso',
      count: createUserDtos.length,
    };
  }

  /**
   * Exemplo de validação de um array como query parameter
   */
  @Get('user-ids')
  findUsersByIds(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return { message: 'IDs recebidos com sucesso', ids };
  }
}
