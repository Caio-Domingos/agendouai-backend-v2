import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TRANSACTION_MANAGER_KEY } from './transaction.constants';
import { EntityManager } from 'typeorm';

/**
 * Decorator para injetar o EntityManager da transação atual em um controlador
 *
 * @example
 * @Post()
 * @UseInterceptors(TransactionInterceptor)
 * async create(@Body() dto: CreateUserDto, @TransactionManager() manager: EntityManager) {
 *   // Usar manager em vez de this.repository para operações que devem estar na transação
 *   const user = manager.create(User, dto);
 *   return manager.save(user);
 * }
 */
export const TransactionManager = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): EntityManager => {
    const request = ctx.switchToHttp().getRequest();
    return request[TRANSACTION_MANAGER_KEY];
  },
);
