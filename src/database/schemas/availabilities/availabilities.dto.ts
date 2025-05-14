import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

export class AvailabilitiesDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser um valor booleano' })
  active?: boolean;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'Dias mínimos para cancelamento deve ser um número' },
  )
  minDaysCancel?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Índice do dia da semana deve ser um número' })
  weekdayIndex?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Intervalo em minutos deve ser um número' })
  intervalMinutes?: number;

  @IsOptional()
  @IsNumber({}, { message: 'ID do espaço deve ser um número' })
  spaceId?: number;

  @IsNumber({}, { message: 'Horário de abertura deve ser um número' })
  openingTime: number;

  @IsNumber({}, { message: 'Horário de fechamento deve ser um número' })
  closingTime: number;

  @IsString({ message: 'Dia da semana deve ser uma string' })
  @MaxLength(20, { message: 'Dia da semana deve ter no máximo 20 caracteres' })
  weekday: string;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId: number;
}

export class CreateAvailabilitiesDTO {
  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser um valor booleano' })
  active?: boolean;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'Dias mínimos para cancelamento deve ser um número' },
  )
  minDaysCancel?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Índice do dia da semana deve ser um número' })
  weekdayIndex?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Intervalo em minutos deve ser um número' })
  intervalMinutes?: number;

  @IsOptional()
  @IsNumber({}, { message: 'ID do espaço deve ser um número' })
  spaceId?: number;

  @IsNumber({}, { message: 'Horário de abertura deve ser um número' })
  openingTime: number;

  @IsNumber({}, { message: 'Horário de fechamento deve ser um número' })
  closingTime: number;

  @IsString({ message: 'Dia da semana deve ser uma string' })
  @MaxLength(20, { message: 'Dia da semana deve ter no máximo 20 caracteres' })
  weekday: string;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId: number;
}

export class UpdateAvailabilitiesDTO extends PartialType(
  CreateAvailabilitiesDTO,
) {}
