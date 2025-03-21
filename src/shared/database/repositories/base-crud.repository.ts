import { NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { Request } from 'express';
import { BaseRepository } from './base.repository';

/**
 * Repositório base que implementa operações CRUD padrão
 * Estende o BaseRepository para aproveitar o gerenciamento de transações
 *
 * @template T - Tipo da entidade
 * @template CreateDto - Tipo do DTO para criação
 * @template UpdateDto - Tipo do DTO para atualização
 */
export abstract class BaseCrudRepository<
  T extends object,
  CreateDto extends object = Partial<T>,
  UpdateDto extends object = Partial<T>,
> extends BaseRepository<T> {
  protected readonly entityClass: new () => T;

  constructor(
    dataSource: DataSource,
    request: Request,
    entityClass: new () => T,
  ) {
    super(dataSource, request);
    this.entityClass = entityClass;
  }

  /**
   * Hook executado antes de criar uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async beforeCreate(dto: CreateDto): Promise<CreateDto> {
    return dto;
  }

  /**
   * Hook executado após criar uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async afterCreate(entity: T): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de atualizar uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async beforeUpdate(id: string, dto: UpdateDto): Promise<UpdateDto> {
    return dto;
  }

  /**
   * Hook executado após atualizar uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async afterUpdate(entity: T): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de remover uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async beforeRemove(id: string): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Hook executado após remover uma entidade
   * Pode ser sobrescrito para implementar lógica personalizada
   */
  protected async afterRemove(id: string): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Cria uma nova entidade
   */
  async create(createDto: CreateDto): Promise<T> {
    const processedDto = await this.beforeCreate(createDto);

    const repository = this.getRepository(this.entityClass);
    const entity = repository.create(processedDto as any);
    const savedEntity = await repository.save(entity);

    return this.afterCreate(savedEntity as unknown as T);
  }

  /**
   * Encontra todas as entidades
   */
  async findAll(): Promise<T[]> {
    return this.getRepository(this.entityClass).find();
  }

  /**
   * Encontra uma entidade pelo ID
   */
  async findById(id: string | number): Promise<T> {
    const entity = await this.getRepository(this.entityClass).findOne({
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
  async update(id: string, updateDto: UpdateDto): Promise<T> {
    // Verificar se a entidade existe
    const existingEntity = await this.findById(id);

    // Processar o DTO antes da atualização
    const processedDto = await this.beforeUpdate(id, updateDto);

    const repository = this.getRepository(this.entityClass);

    // Mesclar o DTO com a entidade existente
    const updatedEntity = repository.merge(existingEntity, processedDto as any);

    // Salvar a entidade atualizada
    const savedEntity = await repository.save(updatedEntity);

    return this.afterUpdate(savedEntity);
  }

  /**
   * Remove uma entidade
   */
  async remove(id: string): Promise<void> {
    // Verificar se a entidade existe
    await this.findById(id);

    // Executar hook antes da remoção
    await this.beforeRemove(id);

    // Remover a entidade
    await this.getRepository(this.entityClass).delete(id);

    // Executar hook após a remoção
    await this.afterRemove(id);
  }
}
