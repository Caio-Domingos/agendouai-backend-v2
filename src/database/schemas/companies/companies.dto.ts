import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

import { CompanyStatus } from './companies.model';

export class CompanyDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @IsString({ message: 'CNPJ deve ser uma string' })
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX',
  })
  cnpj: string;

  @IsOptional()
  @IsString({ message: 'Nome fantasia deve ser uma string' })
  tradingName?: string;

  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  phone?: string;

  @IsEnum(CompanyStatus, {
    message: `Status deve ser um dos valores: ${Object.values(
      CompanyStatus,
    ).join(', ')}`,
  })
  status: CompanyStatus;
}

export class CreateCompanyDTO {
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsString({ message: 'CNPJ deve ser uma string' })
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX',
  })
  @MaxLength(18, { message: 'CNPJ deve ter no máximo 18 caracteres' })
  cnpj: string;

  @IsOptional()
  @IsString({ message: 'Nome fantasia deve ser uma string' })
  @MaxLength(255, {
    message: 'Nome fantasia deve ter no máximo 255 caracteres',
  })
  tradingName?: string;

  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @MaxLength(20, { message: 'Telefone deve ter no máximo 20 caracteres' })
  phone?: string;

  @IsOptional()
  @IsEnum(CompanyStatus, {
    message: `Status deve ser um dos valores: ${Object.values(
      CompanyStatus,
    ).join(', ')}`,
  })
  status?: CompanyStatus;
}

export class UpdateCompanyDTO extends PartialType(CreateCompanyDTO) {}
