import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
  IsObject,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { CompanySubscriptionPaymentStatus } from './company-subscription-history.model';

export class CompanySubscriptionHistoryDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;

  @IsNumber({}, { message: 'ID do plano deve ser um número inteiro' })
  planId: number;

  @IsEnum(CompanySubscriptionPaymentStatus, {
    message: `Status do pagamento deve ser um dos valores: ${Object.values(CompanySubscriptionPaymentStatus).join(', ')}`,
  })
  paymentStatus: CompanySubscriptionPaymentStatus;

  @IsDate({ message: 'Data de início deve ser uma data válida' })
  startedAt: Date;

  @IsOptional()
  @IsDate({ message: 'Data de término deve ser uma data válida' })
  endedAt?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'Valor pago deve ser um número' })
  amountPaid?: number;

  @IsOptional()
  @IsString({ message: 'ID da assinatura Stripe deve ser uma string' })
  stripeSubscriptionId?: string;

  @IsOptional()
  @IsString({ message: 'ID do pagamento Stripe deve ser uma string' })
  stripePaymentIntentId?: string;

  @IsOptional()
  @IsObject({ message: 'Metadados devem ser um objeto JSON' })
  metadata?: object;

  @IsOptional()
  @IsDate({ message: 'Data de criação deve ser uma data válida' })
  createdAt?: Date;
}

export class CreateCompanySubscriptionHistoryDTO {
  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;

  @IsNumber({}, { message: 'ID do plano deve ser um número inteiro' })
  planId: number;

  @IsEnum(CompanySubscriptionPaymentStatus, {
    message: `Status do pagamento deve ser um dos valores: ${Object.values(CompanySubscriptionPaymentStatus).join(', ')}`,
  })
  paymentStatus: CompanySubscriptionPaymentStatus;

  @IsDate({ message: 'Data de início deve ser uma data válida' })
  startedAt: Date;

  @IsOptional()
  @IsDate({ message: 'Data de término deve ser uma data válida' })
  endedAt?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'Valor pago deve ser um número' })
  amountPaid?: number;

  @IsOptional()
  @IsString({ message: 'ID da assinatura Stripe deve ser uma string' })
  stripeSubscriptionId?: string;

  @IsOptional()
  @IsString({ message: 'ID do pagamento Stripe deve ser uma string' })
  stripePaymentIntentId?: string;

  @IsOptional()
  @IsObject({ message: 'Metadados devem ser um objeto JSON' })
  metadata?: object;
}

export class UpdateCompanySubscriptionHistoryDTO extends PartialType(
  CreateCompanySubscriptionHistoryDTO,
) {}
