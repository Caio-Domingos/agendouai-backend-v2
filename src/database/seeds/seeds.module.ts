import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedsController } from './seeds.controller';
import { User } from '../../shared/database/entities/user.entity';
import { SeedsService } from './seeds.service';

import { DatabaseCleanService } from '../clean/database-clean.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [SeedsService, DatabaseCleanService],
  controllers: [SeedsController],
  exports: [SeedsService, DatabaseCleanService],
})
export class SeedsModule {}
