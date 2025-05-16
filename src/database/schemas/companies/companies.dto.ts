import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  IsEnum,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { CompanyStatus, PaymentStatus } from './companies.model';
import { Transform } from 'class-transformer';
import { CreateAvailabilitiesDTO } from '../availabilities/availabilities.dto';
import { Type as TransformType } from 'class-transformer';

export class CompaniesDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'CPF/CNPJ deve ser uma string' })
  @MaxLength(20, { message: 'CPF/CNPJ deve ter no máximo 20 caracteres' })
  cpfCnpj: string;

  @IsOptional()
  @IsString({ message: 'CEP deve ser uma string' })
  @MaxLength(10, { message: 'CEP deve ter no máximo 10 caracteres' })
  cep?: string;

  @IsNumber({}, { message: 'ID da categoria deve ser um número' })
  categoryId: number;

  @IsNumber({}, { message: 'ID do criador deve ser um número' })
  createdBy: number;

  @IsNumber({}, { message: 'ID do atualizador deve ser um número' })
  updatedBy: number;

  @IsOptional()
  @IsString({ message: 'Logo deve ser uma string' })
  logoUrl?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Provider deve ser um número' })
  provider?: number;

  @IsEnum(CompanyStatus, {
    message: `Status deve ser um dos valores: ${Object.values(CompanyStatus).join(', ')}`,
  })
  status: CompanyStatus;

  @IsOptional()
  @IsNumber({}, { message: 'ID do plano atual deve ser um número' })
  currentPlanId?: number;

  @IsOptional()
  @IsEnum(PaymentStatus, {
    message: `Status de pagamento deve ser um dos valores: ${Object.values(PaymentStatus).join(', ')}`,
  })
  currentPaymentStatus?: PaymentStatus;

  @IsOptional()
  @IsString({ message: 'ID do cliente Stripe deve ser uma string' })
  @MaxLength(100, {
    message: 'ID do cliente Stripe deve ter no máximo 100 caracteres',
  })
  stripeCustomerId?: string;

  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(200, { message: 'Nome deve ter no máximo 200 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @MaxLength(20, { message: 'Telefone deve ter no máximo 20 caracteres' })
  phone?: string;

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
}

export class CreateCompaniesDTO {
  // --- OBRIGATÓRIOS ---
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(200, { message: 'Nome deve ter no máximo 200 caracteres' })
  name: string;

  @IsString({ message: 'CPF/CNPJ deve ser uma string' })
  @MaxLength(20, { message: 'CPF/CNPJ deve ter no máximo 20 caracteres' })
  cpfCnpj: string;

  @IsNumber({}, { message: 'ID da categoria deve ser um número' })
  categoryId: number;

  @Transform(({ value }) => undefined)
  createdBy?: number;

  @Transform(({ value }) => undefined)
  updatedBy?: number;

  // --- OPCIONAIS ---
  @IsOptional()
  @ValidateNested({ each: true })
  @TransformType(() => CreateAvailabilitiesDTO)
  companyAvailabilities?: CreateAvailabilitiesDTO[];

  @IsOptional()
  @IsString({ message: 'CEP deve ser uma string' })
  @MaxLength(10, { message: 'CEP deve ter no máximo 10 caracteres' })
  cep?: string;

  @IsOptional()
  @IsString({ message: 'Logo deve ser uma string' })
  logoUrl?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Provider deve ser um número' })
  provider?: number;

  @IsOptional()
  @IsEnum(CompanyStatus, {
    message: `Status deve ser um dos valores: ${Object.values(CompanyStatus).join(', ')}`,
  })
  status?: CompanyStatus;

  @IsOptional()
  @IsNumber({}, { message: 'ID do plano atual deve ser um número' })
  currentPlanId?: number;

  @IsOptional()
  @IsEnum(PaymentStatus, {
    message: `Status de pagamento deve ser um dos valores: ${Object.values(PaymentStatus).join(', ')}`,
  })
  currentPaymentStatus?: PaymentStatus;

  @IsOptional()
  @IsString({ message: 'ID do cliente Stripe deve ser uma string' })
  @MaxLength(100, {
    message: 'ID do cliente Stripe deve ter no máximo 100 caracteres',
  })
  stripeCustomerId?: string;

  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @MaxLength(20, { message: 'Telefone deve ter no máximo 20 caracteres' })
  phone?: string;

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
}

export class UpdateCompaniesDTO extends PartialType(CreateCompaniesDTO) {}
