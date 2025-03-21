import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedsController } from './seeds.controller';
import { User } from '../../shared/database/entities/user.entity';
import { SeedsService } from './seeds.service';
import { ProductsSeedService } from './products-seed.service';
import { Product } from '../../shared/database/entities/product.entity';
import { DatabaseCleanService } from '../clean/database-clean.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product]), ConfigModule],
  providers: [SeedsService, ProductsSeedService, DatabaseCleanService],
  controllers: [SeedsController],
  exports: [SeedsService, ProductsSeedService, DatabaseCleanService],
})
export class SeedsModule {}
