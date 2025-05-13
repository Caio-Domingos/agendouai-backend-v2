import { BadRequestException } from '@nestjs/common';
import { QueryService } from './query.service';
import { Entity } from '../interfaces/crud.types';
import { ICrudRepository } from '../../database/interfaces/repository.interface';

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
  protected async beforeUpdate(id: number, dto: UpdateDto): Promise<UpdateDto> {
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
  protected async beforeRemove(id: number): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Hook executado após remove
   * Pode ser sobrescrito para adicionar lógica personalizada
   */
  protected async afterRemove(id: number): Promise<void> {
    // Hook para ser sobrescrito
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<T> {
    return this.repository.findById(id);
  }

  /**
   * Cria uma nova entidade
   */
  async create(createDto: CreateDto): Promise<T> {
    const processedDto = await this.beforeCreate(createDto);

    try {
      const savedEntity = await this.repository.create(processedDto);
      return await this.afterCreate(savedEntity);
    } catch (error) {
      this.handleDatabaseError(error);
      throw error; // Nunca deve chegar aqui
    }
  }

  /**
   * Atualiza uma entidade existente
   */
  async update(id: number, updateDto: UpdateDto): Promise<T> {
    // Verificar se a entidade existe
    await this.findById(id);

    const processedDto = await this.beforeUpdate(id, updateDto);

    try {
      const updatedEntity = await this.repository.update(id, processedDto);
      return await this.afterUpdate(updatedEntity);
    } catch (error) {
      this.handleDatabaseError(error);
      throw error; // Nunca deve chegar aqui
    }
  }

  /**
   * Remove uma entidade pelo ID
   */
  async remove(id: number): Promise<void> {
    // Verificar se a entidade existe
    await this.findById(id);
    await this.beforeRemove(id);

    try {
      await this.repository.remove(id);
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
