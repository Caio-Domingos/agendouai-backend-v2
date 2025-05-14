import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { PlansRepository } from 'src/database/schemas/plans/plans.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansEntity } from 'src/database/schemas/plans/plans.entity';

@Module({
  exports: [PlansService],
  controllers: [PlansController],
  providers: [PlansService, PlansRepository],
  imports: [TypeOrmModule.forFeature([PlansEntity])],
})
export class PlansModule {}
