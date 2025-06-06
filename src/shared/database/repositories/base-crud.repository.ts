import { NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ICrudRepository } from '../interfaces/repository.interface';
import { IEntity } from '../interfaces/entity.interface';
import { ContextObject } from 'src/shared/context/context.dto';

/**
 * Repositório base que implementa operações CRUD padrão
 * Estende o BaseRepository para aproveitar o gerenciamento de transações
 *
 * @template T - Tipo da entidade
 * @template CreateDto - Tipo do DTO para criação
 * @template UpdateDto - Tipo do DTO para atualização
 */
export abstract class BaseCrudRepository<
    T extends IEntity,
    CreateDto extends object = Partial<T>,
    UpdateDto extends object = Partial<T>,
  >
  extends BaseRepository<T>
  implements ICrudRepository<T, CreateDto, UpdateDto>
{
  protected readonly entityClass: new () => T;

  constructor(
    dataSource: DataSource,
    entityClass: new () => T,
  ) {
    super(dataSource);
    this.entityClass = entityClass;
  }

  /**
   * Hook executado antes de criar uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async beforeCreate(dto: CreateDto, context?: ContextObject): Promise<CreateDto> {
    return dto;
  }

  /**
   * Hook executado após criar uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async afterCreate(entity: T, context?: ContextObject): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de atualizar uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async beforeUpdate(id: string, dto: UpdateDto, context?: ContextObject): Promise<UpdateDto> {
    return dto;
  }

  /**
   * Hook executado após atualizar uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async afterUpdate(entity: T, context?: ContextObject): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de remover uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async beforeRemove(id: string, context?: ContextObject): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Hook executado após remover uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async afterRemove(id: string, context?: ContextObject): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Cria uma nova entidade
   */
  async create(createDto: CreateDto, context?: ContextObject): Promise<T> {
    const processedDto = await this.beforeCreate(createDto, context);
    const request = context?.request;
    const repository = this.getRepository(this.entityClass, request);
    const entity = repository.create(processedDto as any);
    const savedEntity = await repository.save(entity);
    return this.afterCreate(savedEntity as unknown as T, context);
  }

  /**
   * Encontra todas as entidades
   */
  async findAll(context?: ContextObject): Promise<T[]> {
    const request = context?.request;
    return this.getRepository(this.entityClass, request).find();
  }

  /**
   * Encontra uma entidade pelo ID
   */
  async findById(id: string | number, context?: ContextObject): Promise<T> {
    const request = context?.request;
    const entity = await this.getRepository(this.entityClass, request).findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });

    if (!entity) {
      throw new NotFoundException(`Entidade com ID ${id} não encontrada`);
    }

    return entity;
  }

  /**
   * Atualiza uma entidade
   */
  async update(id: string, updateDto: UpdateDto, context?: ContextObject): Promise<T> {
    const existingEntity = await this.findById(id, context);
    const processedDto = await this.beforeUpdate(id, updateDto, context);
    const request = context?.request;
    const repository = this.getRepository(this.entityClass, request);
    const updatedEntity = repository.merge(existingEntity, processedDto as any);
    const savedEntity = await repository.save(updatedEntity);
    return this.afterUpdate(savedEntity, context);
  }

  /**
   * Remove uma entidade
   */
  async remove(id: string, context?: ContextObject): Promise<void> {
    await this.findById(id, context);
    await this.beforeRemove(id, context);
    const request = context?.request;
    await this.getRepository(this.entityClass, request).delete(id);
    await this.afterRemove(id, context);
  }
}
