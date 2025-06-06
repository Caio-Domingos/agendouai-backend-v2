import { BadRequestException } from '@nestjs/common';
import { QueryService } from './query.service';
import { Entity } from '../interfaces/crud.types';
import { ICrudRepository } from '../../database/interfaces/repository.interface';
import { ContextObject } from 'src/shared/context/context.dto';

export class CrudService<
  T extends Entity,
  CreateDto extends object,
  UpdateDto extends object,
> implements ICrudRepository<T, CreateDto, UpdateDto>
{
  constructor(
    protected readonly repository: ICrudRepository<T, CreateDto, UpdateDto>,
  ) {}

  /**
   * Hook executado antes de create
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async beforeCreate(
    dto: CreateDto,
    context?: ContextObject,
  ): Promise<CreateDto> {
    return dto;
  }

  /**
   * Hook executado após create
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async afterCreate(
    entity: T,
    dto: CreateDto,
    context?: ContextObject,
  ): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de update
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async beforeUpdate(
    id: number,
    dto: UpdateDto,
    context?: ContextObject,
  ): Promise<UpdateDto> {
    return dto;
  }

  /**
   * Hook executado após update
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async afterUpdate(
    entity: T,
    dto: UpdateDto,
    context?: ContextObject,
  ): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de remove
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async beforeRemove(
    id: number,
    context?: ContextObject,
  ): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Hook executado após remove
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async afterRemove(
    id: number,
    context?: ContextObject,
  ): Promise<void> {
    // Hook para ser sobrescrito
  }

  async findAll(context?: ContextObject) {
    return this.repository.findAll();
  }

  async findById(id: number, context?: ContextObject): Promise<T> {
    return this.repository.findById(id);
  }

  /**
   * Cria uma nova entidade
   */
  async create(createDto: CreateDto, context?: ContextObject): Promise<T> {
    const processedDto = await this.beforeCreate(createDto, context);
    try {
      const savedEntity = await this.repository.create(processedDto);
      return await this.afterCreate(savedEntity, processedDto, context);
    } catch (error) {
      this.handleDatabaseError(error);
      throw error; // Nunca deve chegar aqui
    }
  }

  /**
   * Atualiza uma entidade existente
   */
  async update(
    id: number,
    updateDto: UpdateDto,
    context?: ContextObject,
  ): Promise<T> {
    await this.findById(id, context);
    const processedDto = await this.beforeUpdate(id, updateDto, context);
    try {
      const updatedEntity = await this.repository.update(id, processedDto);
      return await this.afterUpdate(updatedEntity, processedDto, context);
    } catch (error) {
      this.handleDatabaseError(error);
      throw error; // Nunca deve chegar aqui
    }
  }

  /**
   * Remove uma entidade pelo ID
   */
  async remove(id: number, context?: ContextObject): Promise<void> {
    await this.findById(id, context);
    await this.beforeRemove(id, context);
    try {
      await this.repository.remove(id);
      await this.afterRemove(id, context);
    } catch (error) {
      this.handleDatabaseError(error);
      throw error; // Nunca deve chegar aqui
    }
  }

  /**
   * Trata erros comuns de banco de dados
   */
  private handleDatabaseError(error: any): never {
    // Erro de chave única (por exemplo, email duplicado)
    if (error.code === '23505') {
      const match = error.detail.match(/Key \((.*?)\)=\((.*?)\)/);
      const field = match ? match[1] : 'campo';
      const value = match ? match[2] : 'valor';
      throw new BadRequestException(
        `O valor '${value}' para o campo '${field}' já existe.`,
      );
    }

    // Erro de restrição de chave estrangeira
    if (error.code === '23503') {
      throw new BadRequestException(
        'Não é possível executar esta operação devido a restrições de relacionamento.',
      );
    }

    // Outros erros de banco de dados
    throw new BadRequestException(
      'Erro ao executar operação no banco de dados.',
    );
  }
}
