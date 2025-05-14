import { Module } from '@nestjs/common';
import { SpaceManagersService } from './space-managers.service';
import { SpaceManagersController } from './space-managers.controller';
import { SpaceManagersRepository } from 'src/database/schemas/space-managers/space-managers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceManagersEntity } from 'src/database/schemas/space-managers/space-managers.entity';

@Module({
  exports: [SpaceManagersService],
  controllers: [SpaceManagersController],
  providers: [SpaceManagersService, SpaceManagersRepository],
  imports: [TypeOrmModule.forFeature([SpaceManagersEntity])],
})
export class SpaceManagersModule {}
