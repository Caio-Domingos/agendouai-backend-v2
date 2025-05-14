import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { PeopleRepository } from 'src/database/schemas/people/people.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from 'src/database/schemas/people/people.entity';

@Module({
  exports: [PeopleService],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
  imports: [TypeOrmModule.forFeature([PeopleEntity])],
})
export class PeopleModule {}
