import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { SpacesRepository } from 'src/database/schemas/spaces/spaces.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesEntity } from 'src/database/schemas/spaces/spaces.entity';
import { AvailabilitiesModule } from '../availabilities/availabilities.module';

@Module({
  exports: [SpacesService],
  controllers: [SpacesController],
  providers: [SpacesService, SpacesRepository],
  imports: [TypeOrmModule.forFeature([SpacesEntity]), AvailabilitiesModule],
})
export class SpacesModule {}
