import { DataSource } from 'typeorm';
import { Request } from 'express';
import { BaseCrudRepository } from './base-crud.repository';
import { BaseQueryRepository } from './base-query.repository';
import {
  QueryOptions,
  PaginatedResult,
} from '../../crud/interfaces/crud.types';
import { IEntity } from '../interfaces/entity.interface';

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
  private queryRepo: CrudQueryRepository<T, CreateDto, UpdateDto>;

  constructor(
    dataSource: DataSource,
    request: Request,
    entityClass: new () => T,
    tableName?: string,
  ) {
    super(dataSource, request, entityClass);

    // Criamos uma instância interna de BaseQueryRepository para reutilizar a lógica de consulta
    this.queryRepo = new (class extends CrudQueryRepository<
      T,
      CreateDto,
      UpdateDto
    > {
      constructor() {
        super(dataSource, request, entityClass, tableName);
      }
    })();
  }

  /**
   * Encontra entidades com opções avançadas de consulta (paginação, filtros, relações, etc)
   */
  async findWithOptions(
    options: QueryOptions = {},
  ): Promise<PaginatedResult<T>> {
    return this.queryRepo.findWithOptions(options);
  }

  /**
   * Encontra uma entidade por ID com opções de relações e seleção
   */
  async findOneWithOptions(id: number, options: QueryOptions = {}): Promise<T> {
    return this.queryRepo.findOneWithOptions(id, options);
  }
}
