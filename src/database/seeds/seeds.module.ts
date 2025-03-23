import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';

import { DatabaseCleanService } from '../clean/database-clean.service';
import { UserEntity } from '../schemas/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule],
  providers: [SeedsService, DatabaseCleanService],
  controllers: [SeedsController],
  exports: [SeedsService, DatabaseCleanService],
})
export class SeedsModule {}
