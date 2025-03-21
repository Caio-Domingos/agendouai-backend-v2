import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { CrudService } from '../../shared/crud/services/crud.service';
import { Product } from '../../shared/database/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../shared/database/dto/product.dto';

@Injectable()
export class ProductsService extends CrudService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  /**
   * Hook executado antes de criar um produto
   * Podemos adicionar lógica personalizada aqui
   */
  protected async beforeCreate(
    dto: CreateProductDto,
  ): Promise<CreateProductDto> {
    this.logger.log(`Preparando para criar produto: ${dto.name}`);

    // Você poderia adicionar lógica aqui, como:
    // - Gerar um SKU automaticamente se não fornecido
    // - Verificar estoque em outros sistemas
    // - Validar preço com regras de negócio

    return dto;
  }

  /**
   * Hook executado após criar um produto
   */
  protected async afterCreate(entity: Product): Promise<Product> {
    this.logger.log(
      `Produto criado com sucesso: ${entity.name} (ID: ${entity.id})`,
    );

    // Você poderia adicionar lógica aqui, como:
    // - Notificar sistemas externos
    // - Gerar logs de auditoria
    // - Atualizar estatísticas de estoque

    return entity;
  }

  /**
   * Hook executado antes de atualizar um produto
   */
  protected async beforeUpdate(
    id: string | number,
    dto: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    this.logger.log(`Preparando para atualizar produto ID: ${id}`);
    return dto;
  }

  /**
   * Endpoint personalizado - encontra produtos com estoque baixo
   * Corrigido para usar LessThan do TypeORM
   */
  async findLowStock(threshold: number = 10): Promise<Product[]> {
    // Usando o operador LessThan do TypeORM
    return this.productRepository.find({
      where: {
        stock: LessThan(threshold),
        isActive: true,
      },
      order: {
        stock: 'ASC',
      },
    });
  }
}
