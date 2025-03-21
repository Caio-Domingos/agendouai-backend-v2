import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedsController } from './seeds.controller';
import { User } from '../../users/entities/user.entity';
import { SeedsService } from './seeds.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [SeedsService],
  controllers: [SeedsController],
  exports: [SeedsService],
})
export class SeedsModule {}
