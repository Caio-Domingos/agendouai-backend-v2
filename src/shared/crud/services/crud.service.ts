import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryService } from './query.service';
import { Entity } from '../interfaces/crud.types';

export class CrudService<
  T extends Entity,
  CreateDto extends object,
  UpdateDto extends object,
> extends QueryService<T> {
  constructor(protected readonly repository: Repository<T>) {
    super(repository);
  }

  /**
   * Hook executado antes de create
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async beforeCreate(dto: CreateDto): Promise<CreateDto> {
    return dto;
  }

  /**
   * Hook executado após create
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async afterCreate(entity: T): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de update
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async beforeUpdate(
    id: string | number,
    dto: UpdateDto,
  ): Promise<UpdateDto> {
    return dto;
  }

  /**
   * Hook executado após update
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async afterUpdate(entity: T): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de remove
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async beforeRemove(id: string | number): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Hook executado após remove
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async afterRemove(id: string | number): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Cria uma nova entidade
   */
  async create(createDto: CreateDto): Promise<T> {
    const processedDto = await this.beforeCreate(createDto);

    try {
      const entity = this.repository.create(processedDto as any);
      const savedEntity = await this.repository.save(entity);
      return await this.afterCreate(savedEntity as unknown as T);
    } catch (error) {
      this.handleDatabaseError(error);
      throw error; // Nunca deve chegar aqui
    }
  }

  /**
   * Atualiza uma entidade existente
   */
  async update(id: string | number, updateDto: UpdateDto): Promise<T> {
    // Verificar se a entidade existe
    const existingEntity = await this.findOne(id);

    const processedDto = await this.beforeUpdate(id, updateDto);

    try {
      // Mesclar DTO com entidade existente
      const entity = this.repository.merge(existingEntity, processedDto as any);
      const updatedEntity = await this.repository.save(entity);
      return await this.afterUpdate(updatedEntity);
    } catch (error) {
      this.handleDatabaseError(error);
      throw error; // Nunca deve chegar aqui
    }
  }

  /**
   * Remove uma entidade pelo ID
   */
  async remove(id: string | number): Promise<void> {
    // Verificar se a entidade existe
    await this.findOne(id);
    await this.beforeRemove(id);

    try {
      await this.repository.delete(id);
      await this.afterRemove(id);
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
