import {
  Entity,
  PaginatedResult,
  QueryOptions,
} from '../interfaces/crud.types';
import {
  ICrudQueryRepository,
  ICrudRepository,
  IQueryRepository,
} from '../../database/interfaces/repository.interface';
import { CrudService } from './crud.service';

/**
 * Serviço que combina funcionalidades CRUD e de consulta avançada
 * É a implementação recomendada para a maioria das entidades
 *
 * @template T - Tipo da entidade
 * @template CreateDto - Tipo do DTO para criação
 * @template UpdateDto - Tipo do DTO para atualização
 */
export class CrudQueryService<
  T extends Entity,
  CreateDto extends object,
  UpdateDto extends object,
> extends CrudService<T, CreateDto, UpdateDto> {
  protected readonly queryRepository: IQueryRepository<T>;

  constructor(repository: ICrudQueryRepository<T, CreateDto, UpdateDto>) {
    super(repository);
    // Armazenamos uma referência ao repositório como IQueryRepository
    // para usar os métodos de consulta avançada
    this.queryRepository = repository;
  }

  /**
   * Encontra entidades com opções avançadas de consulta (paginação, filtros, relações, etc)
   */
  async findWithOptions(
    options: QueryOptions = {},
  ): Promise<PaginatedResult<T>> {
    return this.queryRepository.findWithOptions(options);
  }

  /**
   * Encontra uma entidade por ID com opções de relações e seleção
   */
  async findOneWithOptions(id: number, options: QueryOptions = {}): Promise<T> {
    return this.queryRepository.findOneWithOptions(id, options);
  }

  /**
   * Método adicional que permite buscar entidades com opções
   * mas mantém compatibilidade com o comportamento do CrudService
   */
  async findAllWithOptions(
    options: QueryOptions = {},
  ): Promise<PaginatedResult<T> | T[]> {
    return this.findWithOptions(options);
  }

  /**
   * Sobrescreve o método findAll para garantir compatibilidade com CrudService
   */
  async findAll(): Promise<T[]> {
    return super.findAll();
  }

  /**
   * Sobrescreve o método findById para usar o findOneWithOptions
   * para manter compatibilidade com CrudService
   */
  async findById(id: number, options: QueryOptions = {}): Promise<T> {
    if (Object.keys(options).length === 0) {
      // Se não há opções, usa o comportamento padrão do CrudService
      return super.findById(id);
    }
    // Se há opções, usa o método avançado de consulta
    return this.findOneWithOptions(id, options);
  }
}
