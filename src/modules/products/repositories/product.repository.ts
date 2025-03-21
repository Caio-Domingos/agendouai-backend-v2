import { Injectable, Scope, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CrudQueryRepository } from '../../../shared/database/repositories/crud-query.repository';
import { Product } from '../../../shared/database/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../../shared/database/dto/product.dto';
import {
  FilterOperator,
  LogicalOperator,
  OrderDirection,
} from 'src/shared/crud';

@Injectable({ scope: Scope.REQUEST })
export class ProductRepository extends CrudQueryRepository<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, Product, 'product');
  }

  /**
   * Encontra produtos ativos
   */
  async findAllActive(): Promise<Product[]> {
    return this.findWithOptions({
      filters: [
        { field: 'isActive', operator: FilterOperator.EQUALS, value: true },
      ],
    }).then((result) => result.items);
  }

  /**
   * Encontra um produto com seu criador
   */
  async findOneWithCreator(id: string): Promise<Product> {
    return this.findOneWithOptions(id, {
      relations: [{ path: 'creator', alias: 'creator' }],
    });
  }

  /**
   * Encontra produtos com estoque baixo
   */
  async findLowStock(threshold: number = 10): Promise<Product[]> {
    return this.findWithOptions({
      filters: [
        {
          field: 'stock',
          operator: FilterOperator.LESS_THAN,
          value: threshold,
        },
        { field: 'isActive', operator: FilterOperator.EQUALS, value: true },
      ],
      order: {
        field: 'stock',
        direction: OrderDirection.ASC,
      },
    }).then((result) => result.items);
  }

  /**
   * Exemplo de método com filtros complexos - produtos que estão em promoção OU tem estoque baixo
   */
  async findPromotionOrLowStock(threshold: number = 10): Promise<Product[]> {
    return this.findWithOptions({
      filters: [
        {
          operator: LogicalOperator.OR,
          filters: [
            {
              field: 'isPromotion',
              operator: FilterOperator.EQUALS,
              value: true,
            },
            {
              field: 'stock',
              operator: FilterOperator.LESS_THAN,
              value: threshold,
            },
          ],
        },
      ],
    }).then((result) => result.items);
  }

  /**
   * Hook personalizado executado antes de criar um produto
   */
  protected async beforeCreate(
    dto: CreateProductDto,
  ): Promise<CreateProductDto> {
    // Aqui você poderia fazer validações adicionais ou manipular o DTO
    console.log(`Criando produto: ${dto.name}`);
    return dto;
  }
}
