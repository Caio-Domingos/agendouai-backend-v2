import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransactionInterceptor } from './transaction.interceptor';
import { TransactionManager } from './transaction.decorator';
import { EntityManager } from 'typeorm';

// Esse é apenas um exemplo de como usar o TransactionInterceptor em controllers
@ApiTags('example')
@Controller('example-transactions')
export class TransactionExampleController {
  @Post('complex-operation')
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({ summary: 'Exemplo de operação complexa com transação' })
  async complexOperation(
    @Body() dto: any,
    @TransactionManager() manager: EntityManager,
  ) {
    // Usar o EntityManager da transação para todas as operações de banco
    // Todas as operações fazem parte da mesma transação e serão
    // revertidas automaticamente se ocorrer algum erro

    // Por exemplo:
    // const user = await manager.findOne(User, { where: { id: dto.userId } });
    // const product = manager.create(Product, { ...dto, creatorId: user.id });
    // await manager.save(product);

    // Se qualquer operação falhar, o TransactionInterceptor fará rollback
    return { message: 'Operação complexa realizada com sucesso' };
  }
}
