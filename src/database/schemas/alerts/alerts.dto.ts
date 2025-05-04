import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

import { AlertConfig, AlertStatus } from './alerts.model';

export class AlertDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'ID da submissão deve ser um número inteiro' })
  submissionId: number;

  @IsNumber({}, { message: 'ID da resposta deve ser um número inteiro' })
  answerId: number;

  @IsObject({
    message: 'Configuração do alerta deve ser um objeto JSON válido',
  })
  alertConfig: Record<string, any>;

  @IsEnum(AlertStatus, {
    message: `Status deve ser um dos valores: ${Object.values(AlertStatus).join(', ')}`,
  })
  status: AlertStatus;

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId?: number;

  @IsOptional()
  @IsString({
    message: 'Observação deve ser uma string válida',
  })
  observation?: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'ID da submissão de resposta deve ser um número inteiro' },
  )
  responseSubmissionId?: number;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Data de resposta deve ser uma string de data válida' },
  )
  respondedAt?: Date;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'ID do usuário que respondeu deve ser um número inteiro' },
  )
  respondedBy?: number;
}

export class CreateAlertDTO {
  @IsNumber({}, { message: 'ID da submissão deve ser um número inteiro' })
  submissionId: number;

  @IsNumber({}, { message: 'ID da resposta deve ser um número inteiro' })
  answerId: number;

  @IsOptional()
  @IsObject({
    message: 'Configuração do alerta deve ser um objeto JSON válido',
  })
  alertConfig?: AlertConfig;

  @IsOptional()
  @IsEnum(AlertStatus, {
    message: `Status deve ser um dos valores: ${Object.values(AlertStatus).join(', ')}`,
  })
  status?: AlertStatus;

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId?: number;

  @IsOptional()
  @IsString({
    message: 'Observação deve ser uma string válida',
  })
  observation?: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'ID da submissão de resposta deve ser um número inteiro' },
  )
  responseSubmissionId?: number;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Data de resposta deve ser uma string de data válida' },
  )
  respondedAt?: Date;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'ID do usuário que respondeu deve ser um número inteiro' },
  )
  respondedBy?: number;
}

export class UpdateAlertDTO extends PartialType(CreateAlertDTO) {}
