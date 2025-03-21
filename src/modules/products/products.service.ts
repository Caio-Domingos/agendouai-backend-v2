import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../shared/database/dto/product.dto';
import { Product } from '../../shared/database/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAllActive();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOneWithCreator(id);
  }

  async create(createDto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(createDto);
  }

  // Outros métodos
}
