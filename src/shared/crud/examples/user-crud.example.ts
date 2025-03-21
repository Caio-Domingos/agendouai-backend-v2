import { Controller, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../../users/entities/user.entity';
import { CrudController } from '../controllers/crud.controller';
import { CrudService } from '../services/crud.service';

// DTOs
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserExampleDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserExampleDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UserResponseExampleDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

// Service
@Injectable()
export class UserCrudExampleService extends CrudService<
  User,
  CreateUserExampleDto,
  UpdateUserExampleDto
> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }

  // Exemplo de sobrescrita de hook
  protected async beforeCreate(
    dto: CreateUserExampleDto,
  ): Promise<CreateUserExampleDto> {
    // Aqui você poderia, por exemplo, hashear a senha antes de criar o usuário
    console.log('Executando lógica personalizada antes de criar um usuário');
    return dto;
  }

  protected async afterCreate(entity: User): Promise<User> {
    console.log('Usuário criado com sucesso:', entity);
    return entity;
  }
}

// Controller
@ApiTags('users-example')
@Controller('users-example')
export class UserCrudExampleController extends CrudController<
  User,
  typeof CreateUserExampleDto,
  typeof UpdateUserExampleDto,
  typeof UserResponseExampleDto
>(
  'usuário',
  CreateUserExampleDto,
  UpdateUserExampleDto,
  UserResponseExampleDto,
) {
  constructor(private readonly userService: UserCrudExampleService) {
    super(userService);
  }

  // Você pode adicionar métodos personalizados aqui se necessário
}
