import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from '../../shared/database/entities/product.entity';
import { CrudModule } from '../../shared/crud/crud.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CrudModule, // Importa nosso módulo CRUD genérico
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
