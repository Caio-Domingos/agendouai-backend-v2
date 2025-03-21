import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private dataSource: DataSource) {}

  /**
   * Executa uma operação dentro de uma transação
   *
   * @param callback Função a ser executada dentro da transação
   * @returns O resultado da função callback
   *
   * @example
   * // No seu service:
   * async createProduct(dto: CreateProductDto) {
   *   return this.transactionService.executeInTransaction(async (manager) => {
   *     const product = manager.create(Product, dto);
   *     await manager.save(product);
   *
   *     // Outras operações na mesma transação
   *     const log = manager.create(ActivityLog, {
   *       action: 'create_product',
   *       productId: product.id
   *     });
   *     await manager.save(log);
   *
   *     return product;
   *   });
   * }
   */
  async executeInTransaction<T>(
    callback: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    // Cria um queryRunner para gerenciar a transação
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Executa o callback passando o entity manager
      const result = await callback(queryRunner.manager);

      // Commit se tudo correr bem
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      // Rollback em caso de erro
      this.logger.warn(`Rollback da transação: ${error.message}`);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Libera o query runner
      await queryRunner.release();
    }
  }
}
