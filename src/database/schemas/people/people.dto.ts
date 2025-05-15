import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  IsDate,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

export class PeopleDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string' })
  @MaxLength(20, { message: 'CPF deve ter no máximo 20 caracteres' })
  cpf?: string;

  @IsString({ message: 'Telefone deve ser uma string' })
  @MaxLength(20, { message: 'Telefone deve ter no máximo 20 caracteres' })
  phoneNumber: string;

  @IsOptional()
  @IsString({ message: 'CEP deve ser uma string' })
  @MaxLength(10, { message: 'CEP deve ter no máximo 10 caracteres' })
  cep?: string;

  @IsNumber({}, { message: 'ID do criador deve ser um número' })
  createdBy: number;

  @IsNumber({}, { message: 'ID do atualizador deve ser um número' })
  updatedBy: number;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  @IsOptional()
  companyId?: number;

  @IsString({ message: 'ID do usuário deve ser uma string' })
  userId: number;

  @IsOptional()
  @IsString({ message: 'URL da foto deve ser uma string' })
  photoUrl?: string;

  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(200, { message: 'Nome deve ter no máximo 200 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Função deve ser uma string' })
  @MaxLength(100, { message: 'Função deve ter no máximo 100 caracteres' })
  role?: string;

  @IsOptional()
  @IsString({ message: 'Cidade deve ser uma string' })
  @MaxLength(100, { message: 'Cidade deve ter no máximo 100 caracteres' })
  city?: string;

  @IsOptional()
  @IsString({ message: 'Estado deve ser uma string' })
  @MaxLength(50, { message: 'Estado deve ter no máximo 50 caracteres' })
  state?: string;

  @IsOptional()
  @IsString({ message: 'País deve ser uma string' })
  @MaxLength(50, { message: 'País deve ter no máximo 50 caracteres' })
  country?: string;

  @IsOptional()
  @IsString({ message: 'Endereço deve ser uma string' })
  @MaxLength(200, { message: 'Endereço deve ter no máximo 200 caracteres' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Número do endereço deve ser uma string' })
  @MaxLength(20, {
    message: 'Número do endereço deve ter no máximo 20 caracteres',
  })
  addressNumber?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de nascimento deve ser uma data válida' })
  birthDate?: Date;
}

export class CreatePeopleDTO {
  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string' })
  @MaxLength(20, { message: 'CPF deve ter no máximo 20 caracteres' })
  cpf?: string;

  @IsString({ message: 'Telefone deve ser uma string' })
  @MaxLength(20, { message: 'Telefone deve ter no máximo 20 caracteres' })
  phoneNumber: string;

  @IsOptional()
  @IsString({ message: 'CEP deve ser uma string' })
  @MaxLength(10, { message: 'CEP deve ter no máximo 10 caracteres' })
  cep?: string;

  @IsNumber({}, { message: 'ID do criador deve ser um número' })
  createdBy: number;

  @IsNumber({}, { message: 'ID do atualizador deve ser um número' })
  updatedBy: number;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  @IsOptional()
  companyId?: number;

  @IsString({ message: 'ID do usuário deve ser uma string' })
  userId: number;

  @IsOptional()
  @IsString({ message: 'URL da foto deve ser uma string' })
  photoUrl?: string;

  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(200, { message: 'Nome deve ter no máximo 200 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Função deve ser uma string' })
  @MaxLength(100, { message: 'Função deve ter no máximo 100 caracteres' })
  role?: string;

  @IsOptional()
  @IsString({ message: 'Cidade deve ser uma string' })
  @MaxLength(100, { message: 'Cidade deve ter no máximo 100 caracteres' })
  city?: string;

  @IsOptional()
  @IsString({ message: 'Estado deve ser uma string' })
  @MaxLength(50, { message: 'Estado deve ter no máximo 50 caracteres' })
  state?: string;

  @IsOptional()
  @IsString({ message: 'País deve ser uma string' })
  @MaxLength(50, { message: 'País deve ter no máximo 50 caracteres' })
  country?: string;

  @IsOptional()
  @IsString({ message: 'Endereço deve ser uma string' })
  @MaxLength(200, { message: 'Endereço deve ter no máximo 200 caracteres' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Número do endereço deve ser uma string' })
  @MaxLength(20, {
    message: 'Número do endereço deve ter no máximo 20 caracteres',
  })
  addressNumber?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de nascimento deve ser uma data válida' })
  birthDate?: Date;
}

export class UpdatePeopleDTO extends PartialType(CreatePeopleDTO) {}
