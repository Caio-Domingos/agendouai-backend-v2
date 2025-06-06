import { DataSource } from 'typeorm';
import { BaseCrudRepository } from './base-crud.repository';
import { BaseQueryRepository } from './base-query.repository';
import {
  QueryOptions,
  PaginatedResult,
} from '../../crud/interfaces/crud.types';
import { IEntity } from '../interfaces/entity.interface';
import { ContextObject } from 'src/shared/context/context.dto';

/**
 * Repositório que combina funcionalidades CRUD e de consulta avançada
 * É a implementação recomendada para a maioria das entidades
 *
 * @template T - Tipo da entidade
 * @template CreateDto - Tipo do DTO para criação
 * @template UpdateDto - Tipo do DTO para atualização
 */
export abstract class CrudQueryRepository<
  T extends IEntity,
  CreateDto extends object = Partial<T>,
  UpdateDto extends object = Partial<T>,
> extends BaseCrudRepository<T, CreateDto, UpdateDto> {
  private queryRepo: BaseQueryRepository<T>;

  constructor(
    dataSource: DataSource,
    entityClass: new () => T,
    tableName?: string,
  ) {
    super(dataSource, entityClass);

    // Criamos uma instância interna de BaseQueryRepository para reutilizar a lógica de consulta
    this.queryRepo = new (class extends BaseQueryRepository<T> {
      constructor() {
        super(dataSource, entityClass, tableName);
      }
    })();
  }

  /**
   * Encontra entidades com opções avançadas de consulta (paginação, filtros, relações, etc)
   */
  async findWithOptions(
    options: QueryOptions = {},
    context?: ContextObject,
  ): Promise<PaginatedResult<T>> {
    const request = context?.request;
    return this.queryRepo.findWithOptions(options, request);
  }

  /**
   * Encontra uma entidade por ID com opções de relações e seleção
   */
  async findOneWithOptions(
    id: number,
    options: QueryOptions = {},
    context?: ContextObject,
  ): Promise<T> {
    const request = context?.request;
    return this.queryRepo.findOneWithOptions(id, options, request);
  }
}
