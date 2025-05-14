import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/database/schemas/users/users.repository';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule {}
