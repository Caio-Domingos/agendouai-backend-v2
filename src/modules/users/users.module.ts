import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/database/schemas/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/schemas/users/users.entity';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [TypeOrmModule.forFeature([UsersEntity])],
})
export class UsersModule {}
