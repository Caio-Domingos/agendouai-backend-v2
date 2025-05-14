import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  IsObject,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { WeekDayName, WeekDayIndex } from './availabilities.model';

export class AvailabilitiesDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'Horário de abertura deve ser um número' })
  openingTime: number;

  @IsNumber({}, { message: 'Horário de fechamento deve ser um número' })
  closingTime: number;

  @IsString({ message: 'Dia da semana deve ser uma string' })
  @MaxLength(20, { message: 'Dia da semana deve ter no máximo 20 caracteres' })
  weekday: WeekDayName;

  @IsNumber({}, { message: 'Índice do dia da semana deve ser um número' })
  weekdayIndex: WeekDayIndex;

  @IsNumber(
    {},
    { message: 'Dias mínimos para cancelamento deve ser um número' },
  )
  minDaysCancel: number;

  @IsNumber({}, { message: 'Intervalo em minutos deve ser um número' })
  intervalMinutes: number;

  @IsObject({ message: 'Configuração deve ser um objeto' })
  configuration: Record<string, any>;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId: number;

  @IsOptional()
  @IsNumber({}, { message: 'ID do espaço deve ser um número' })
  spaceId?: number;
}

export class CreateAvailabilitiesDTO {
  @IsNumber({}, { message: 'Horário de abertura deve ser um número' })
  openingTime: number;

  @IsNumber({}, { message: 'Horário de fechamento deve ser um número' })
  closingTime: number;

  @IsString({ message: 'Dia da semana deve ser uma string' })
  @MaxLength(20, { message: 'Dia da semana deve ter no máximo 20 caracteres' })
  weekday: WeekDayName;

  @IsNumber({}, { message: 'Índice do dia da semana deve ser um número' })
  weekdayIndex: WeekDayIndex;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'Dias mínimos para cancelamento deve ser um número' },
  )
  minDaysCancel?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Intervalo em minutos deve ser um número' })
  intervalMinutes?: number;

  @IsOptional()
  @IsObject({ message: 'Configuração deve ser um objeto' })
  configuration?: Record<string, any>;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId: number;

  @IsOptional()
  @IsNumber({}, { message: 'ID do espaço deve ser um número' })
  spaceId?: number;
}

export class UpdateAvailabilitiesDTO extends PartialType(
  CreateAvailabilitiesDTO,
) {}
