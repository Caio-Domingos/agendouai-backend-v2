import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CrudController } from '../../shared/crud/controllers/crud.controller';
import { Product } from '../../shared/database/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductDto,
} from '../../shared/database/dto/product.dto';
import { ProductsService } from './products.service';
import { Roles, Role } from '../../auth/decorators/roles.decorator';
import { TransactionInterceptor } from '../../shared/interceptors/transaction/transaction.interceptor';
import { TransactionManager } from '../../shared/interceptors/transaction/transaction.decorator';
import { EntityManager } from 'typeorm';

@ApiTags('products')
@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('JWT')
export class ProductsController extends CrudController<
  Product,
  typeof CreateProductDto,
  typeof UpdateProductDto,
  typeof ProductDto
>('produto', CreateProductDto, UpdateProductDto, ProductDto) {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }

  @Post()
  @UseInterceptors(TransactionInterceptor) // Aplica o interceptor para gerenciar a transação
  async create(
    @Body() createDto: CreateProductDto,
    @TransactionManager() manager: EntityManager, // Recebe o EntityManager da transação
  ) {
    // Passa o EntityManager para o serviço
    return this.productsService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
