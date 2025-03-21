import { ENTITY_MANAGER_KEY } from '../../interceptors/transaction/transaction.interceptor';
import { Request } from 'express';
import {
  DataSource,
  EntityManager,
  Repository,
  ObjectType,
  EntityTarget,
} from 'typeorm';

export class BaseRepository<T extends object> {
  constructor(
    private dataSource: DataSource,
    private request?: Request,
  ) {}

  /**
   * Obtém um repositório para a entidade especificada
   * Se houver uma transação ativa no request, usa o EntityManager da transação
   * Caso contrário, usa o manager padrão do DataSource
   */
  protected getRepository(entityClass: EntityTarget<T>): Repository<T> {
    // Tenta obter o EntityManager da transação, senão usa o manager padrão
    const entityManager: EntityManager =
      this.request?.[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;

    if (!entityManager) {
      throw new Error(
        'EntityManager não disponível no request nem no DataSource.',
      );
    }

    return entityManager.getRepository(entityClass);
  }
}
