import { NotFoundException } from '@nestjs/common';
import {
  Entity,
  PaginatedResult,
  QueryOptions,
} from '../interfaces/crud.types';
import {
  ICrudRepository,
  IQueryRepository,
} from '../../database/interfaces/repository.interface';

export class QueryService<T extends Entity> {
  constructor(protected readonly repository: IQueryRepository<T>) {}

  /**
   * Encontra uma entidade pelo ID
   */
  async findOne(id: number, options: QueryOptions = {}): Promise<T> {
    try {
      return await this.repository.findOneWithOptions(id);
    } catch (error) {
      throw new NotFoundException(`Entidade com ID ${id} não encontrada`);
    }
  }

  /**
   * Encontra todas as entidades
   */
  async findAll(options: QueryOptions = {}): Promise<PaginatedResult<T>> {
    return this.repository.findWithOptions(options);
  }
}
