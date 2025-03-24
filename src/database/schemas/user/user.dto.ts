import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { UserStatus } from './user.model';

export class UserDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'Nome deve ser uma string' })
  name: string;
  @IsString({ message: 'Email deve ser uma string' })
  email: string;

  @IsOptional()
  @IsEnum(UserStatus, {
    message: `Status deve ser um dos valores: ${Object.values(UserStatus).join(', ')}`,
  })
  status: UserStatus;
}

export class CreateUserDTO {
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;
  @IsString({ message: 'Email deve ser uma string' })
  email: string;

  @IsOptional()
  @IsEnum(UserStatus, {
    message: `Status deve ser um dos valores: ${Object.values(UserStatus).join(', ')}`,
  })
  status?: UserStatus;

  @IsString({ message: 'Senha deve ser uma string' })
  password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
