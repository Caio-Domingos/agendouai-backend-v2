import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  MaxLength,
  Matches,
} from 'class-validator';
import { BaseDto } from '../dto/base.dto';
import { BaseCreateDto } from '../dto/base-create.dto';
import { Exclude, Expose, Transform } from 'class-transformer';
import { PartialType } from '../../validation/dto-helpers';

export class UserDto extends BaseDto {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  isActive: boolean;

  @Expose()
  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  fullName: string;

  constructor(partial: Partial<UserDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}

export class CreateUserDto extends BaseCreateDto {
  @IsNotEmpty({ message: 'O primeiro nome é obrigatório' })
  @IsString({ message: 'O primeiro nome deve ser uma string' })
  @MaxLength(100, {
    message: 'O primeiro nome não pode ter mais de 100 caracteres',
  })
  firstName: string;

  @IsNotEmpty({ message: 'O sobrenome é obrigatório' })
  @IsString({ message: 'O sobrenome deve ser uma string' })
  @MaxLength(100, {
    message: 'O sobrenome não pode ter mais de 100 caracteres',
  })
  lastName: string;

  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
  })
  password: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive deve ser um valor booleano' })
  isActive?: boolean = true;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// DTO especializado para alterar apenas a senha
export class ChangeUserPasswordDto {
  @IsNotEmpty({ message: 'A senha atual é obrigatória' })
  @IsString({ message: 'A senha atual deve ser uma string' })
  currentPassword: string;

  @IsNotEmpty({ message: 'A nova senha é obrigatória' })
  @IsString({ message: 'A nova senha deve ser uma string' })
  @MinLength(8, { message: 'A nova senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'A nova senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
  })
  newPassword: string;

  @IsNotEmpty({ message: 'A confirmação da senha é obrigatória' })
  @IsString({ message: 'A confirmação da senha deve ser uma string' })
  @MinLength(8, {
    message: 'A confirmação da senha deve ter pelo menos 8 caracteres',
  })
  confirmPassword: string;
}
