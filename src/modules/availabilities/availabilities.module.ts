import { Module } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { AvailabilitiesController } from './availabilities.controller';
import { AvailabilitiesRepository } from 'src/database/schemas/availabilities/availabilities.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilitiesEntity } from 'src/database/schemas/availabilities/availabilities.entity';

@Module({
  exports: [AvailabilitiesService],
  controllers: [AvailabilitiesController],
  providers: [AvailabilitiesService, AvailabilitiesRepository],
  imports: [TypeOrmModule.forFeature([AvailabilitiesEntity])],
})
export class AvailabilitiesModule {}
