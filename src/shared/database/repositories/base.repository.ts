import { DataSource, Repository, EntityTarget, EntityManager } from 'typeorm';
import { Request } from 'express';
import { ENTITY_MANAGER_KEY } from '../../interceptors/transaction/transaction.interceptor';

export class BaseRepository<T extends object> {
  constructor(
    private dataSource: DataSource,
  ) {}

  /**
   * Obtém um repositório para a entidade especificada
   * Se houver uma transação ativa no request, usa o EntityManager da transação
   * Caso contrário, usa o manager padrão do DataSource
   */
  protected getRepository(entityClass: EntityTarget<T>, request?: Request): Repository<T> {
    const entityManager: EntityManager =
      request?.[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    if (!entityManager) {
      throw new Error(
        'EntityManager não disponível no request nem no DataSource.',
      );
    }
    return entityManager.getRepository(entityClass);
  }
}
