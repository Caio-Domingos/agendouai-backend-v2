import {
  Entity,
  PaginatedResult,
  QueryOptions,
} from '../../crud/interfaces/crud.types';

/**
 * Interface para repositórios compatíveis com CrudService
 * Define os métodos necessários para operações CRUD
 */
export interface ICrudRepository<
  T extends Entity,
  CreateDto = any,
  UpdateDto = any,
> {
  create(createDto: CreateDto): Promise<T>;
  findById(id: string | number): Promise<T>;
  update(id: string | number, updateDto: UpdateDto): Promise<T>;
  remove(id: string | number): Promise<void>;

  // Métodos adicionais que podem ser necessários pelo CrudService
  findAll(): Promise<T[]>;
}

export interface IQueryRepository<T extends Entity> {
  findWithOptions(options?: QueryOptions): Promise<PaginatedResult<T>>;
  findOneWithOptions(id: number, options?: QueryOptions): Promise<T>;
}

export interface ICrudQueryRepository<
  T extends Entity,
  CreateDto = any,
  UpdateDto = any,
> extends ICrudRepository<T, CreateDto, UpdateDto>,
    IQueryRepository<T> {}
