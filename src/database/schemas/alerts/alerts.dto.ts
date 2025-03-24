import { IsEnum, IsNumber, IsObject, IsOptional } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { AlertStatus } from './alerts.model';

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
  alertConfig?: Record<string, any>;

  @IsOptional()
  @IsEnum(AlertStatus, {
    message: `Status deve ser um dos valores: ${Object.values(AlertStatus).join(', ')}`,
  })
  status?: AlertStatus;
}

export class UpdateAlertDTO extends PartialType(CreateAlertDTO) {}
