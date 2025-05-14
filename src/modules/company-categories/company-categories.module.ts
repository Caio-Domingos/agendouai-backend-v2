import { Module } from '@nestjs/common';
import { CompanyCategoriesService } from './company-categories.service';
import { CompanyCategoriesController } from './company-categories.controller';
import { CompanyCategoriesRepository } from 'src/database/schemas/company-categories/company-categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyCategoriesEntity } from 'src/database/schemas/company-categories/company-categories.entity';

@Module({
  exports: [CompanyCategoriesService],
  controllers: [CompanyCategoriesController],
  providers: [CompanyCategoriesService, CompanyCategoriesRepository],
  imports: [TypeOrmModule.forFeature([CompanyCategoriesEntity])],
})
export class CompanyCategoriesModule {}
