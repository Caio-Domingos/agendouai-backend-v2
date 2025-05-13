import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

import { UserRole, UserStatus } from './user.model';

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

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId?: number;

  @IsOptional()
  @IsNumber(
    {},
    {
      message:
        'ID da unidade é obrigatório para usuários não-administradores e não-empresas',
    },
  )
  unitId?: number;
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

  @ValidateIf((o) => o.role !== UserRole.ADMIN)
  @IsNumber(
    {},
    {
      message: 'ID da empresa é obrigatório para usuários não-administradores',
    },
  )
  companyId?: number;

  // @ValidateIf((o) => o.role !== UserRole.ADMIN && o.role !== UserRole.COMPANY)
  @IsOptional()
  @IsNumber(
    {},
    {
      message:
        'ID da unidade é obrigatório para usuários não-administradores e não-empresas',
    },
  )
  unitId?: number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsOptional()
  @IsEnum(UserRole, {
    message: `Papel deve ser um dos valores: ${Object.values(UserRole).join(', ')}`,
  })
  role: UserRole;
}
