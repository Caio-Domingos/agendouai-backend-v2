import { Module } from '@nestjs/common';
import { UnitService } from './units.service';
import { UnitController } from './units.controller';
import { UnitRepository } from 'src/database/schemas/units/units.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from 'src/database/schemas/units/units.entity';

@Module({
  exports: [UnitService],
  controllers: [UnitController],
  providers: [UnitService, UnitRepository],
})
export class UnitModule {}
