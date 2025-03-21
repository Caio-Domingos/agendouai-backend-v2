import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
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

  /**
   * Endpoint personalizado para encontrar produtos com estoque baixo
   */
  @Get('low-stock')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Encontrar produtos com estoque baixo' })
  @ApiQuery({
    name: 'threshold',
    required: false,
    type: Number,
    description: 'Limite de estoque para considerar como baixo (padrão: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos com estoque baixo',
    type: [ProductDto],
  })
  async findLowStock(@Query('threshold') threshold?: number) {
    return this.productsService.findLowStock(
      threshold ? Number(threshold) : undefined,
    );
  }
}
