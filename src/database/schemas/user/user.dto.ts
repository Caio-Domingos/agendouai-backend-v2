import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { UserRole, UserStatus } from './user.model';
import { Transform } from 'class-transformer';

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

  @IsOptional()
  @IsEnum(UserRole, {
    message: `Papel deve ser um dos valores: ${Object.values(UserRole).join(', ')}`,
  })
  role: UserRole;
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
  @Transform(({ value }) => (value !== undefined ? value : UserStatus.ACTIVE))
  status?: UserStatus;

  @IsString({ message: 'Senha deve ser uma string' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: `Papel deve ser um dos valores: ${Object.values(UserRole).join(', ')}`,
  })
  @Transform(({ value }) => (value !== undefined ? value : UserRole.EMPLOYEE))
  role: UserRole;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsOptional()
  @IsEnum(UserRole, {
    message: `Papel deve ser um dos valores: ${Object.values(UserRole).join(', ')}`,
  })
  role: UserRole;
}
