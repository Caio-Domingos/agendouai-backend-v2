import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { UserStatus, UserPermission } from './users.model';

export class UserDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsOptional()
  @IsEnum(UserStatus, {
    message: `Status deve ser um dos valores: ${Object.values(UserStatus).join(', ')}`,
  })
  status?: UserStatus;

  @IsOptional()
  @IsString({ message: 'Código de redefinição deve ser uma string' })
  @MaxLength(100, {
    message: 'Código de redefinição deve ter no máximo 100 caracteres',
  })
  resetCode?: string;

  @IsNumber({}, { message: 'ID do criador deve ser um número' })
  createdBy: number;

  @IsNumber({}, { message: 'ID do atualizador deve ser um número' })
  updatedBy: number;

  @IsEnum(UserPermission, {
    message: `Permissão deve ser um dos valores: ${Object.values(UserPermission).join(', ')}`,
  })
  permission: UserPermission;

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId?: number;

  @IsOptional()
  @IsNumber({}, { message: 'ID da pessoa deve ser um número' })
  personId?: number;

  @IsString({ message: 'Nome de usuário deve ser uma string' })
  @MaxLength(100, {
    message: 'Nome de usuário deve ter no máximo 100 caracteres',
  })
  username: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @MaxLength(255, { message: 'Senha deve ter no máximo 255 caracteres' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Push token deve ser uma string' })
  @MaxLength(255, { message: 'Push token deve ter no máximo 255 caracteres' })
  pushToken?: string;
}

export class CreateUserDTO {
  @IsOptional()
  @IsEnum(UserStatus, {
    message: `Status deve ser um dos valores: ${Object.values(UserStatus).join(', ')}`,
  })
  status?: UserStatus;

  @IsOptional()
  @IsString({ message: 'Código de redefinição deve ser uma string' })
  @MaxLength(100, {
    message: 'Código de redefinição deve ter no máximo 100 caracteres',
  })
  resetCode?: string;

  @IsNumber({}, { message: 'ID do criador deve ser um número' })
  createdBy: number;

  @IsNumber({}, { message: 'ID do atualizador deve ser um número' })
  updatedBy: number;

  @IsOptional()
  @IsEnum(UserPermission, {
    message: `Permissão deve ser um dos valores: ${Object.values(UserPermission).join(', ')}`,
  })
  permission?: UserPermission;

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId?: number;

  @IsOptional()
  @IsNumber({}, { message: 'ID da pessoa deve ser um número' })
  personId?: number;

  @IsString({ message: 'Nome de usuário deve ser uma string' })
  @MaxLength(100, {
    message: 'Nome de usuário deve ter no máximo 100 caracteres',
  })
  username: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @MaxLength(255, { message: 'Senha deve ter no máximo 255 caracteres' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Push token deve ser uma string' })
  @MaxLength(255, { message: 'Push token deve ter no máximo 255 caracteres' })
  pushToken?: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
