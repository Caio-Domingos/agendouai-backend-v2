import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { BookingStatus } from './bookings.model';

export class BookingDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'Data da reserva deve ser uma string ISO' })
  bookingDate: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'Índice do dia da semana deve ser um número inteiro' },
  )
  weekdayIndex?: number;

  @IsNumber({}, { message: 'ID do espaço deve ser um número inteiro' })
  spaceId: number;

  @IsNumber({}, { message: 'ID do usuário deve ser um número inteiro' })
  userId: number;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;

  @IsNumber({}, { message: 'Horário de início deve ser um número' })
  startTime: number;

  @IsNumber({}, { message: 'Horário de término deve ser um número' })
  endTime: number;

  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  notes?: string;

  @IsEnum(BookingStatus, {
    message: `Status deve ser um dos valores: ${Object.values(BookingStatus).join(', ')}`,
  })
  status: BookingStatus;

  @IsString({
    message: 'Data de atualização do status deve ser uma string ISO',
  })
  statusUpdatedAt: string;
}

export class CreateBookingDTO {
  @IsString({ message: 'Data da reserva deve ser uma string ISO' })
  bookingDate: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'Índice do dia da semana deve ser um número inteiro' },
  )
  weekdayIndex?: number;

  @IsNumber({}, { message: 'ID do espaço deve ser um número inteiro' })
  spaceId: number;

  @IsNumber({}, { message: 'ID do usuário deve ser um número inteiro' })
  userId: number;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;

  @IsNumber({}, { message: 'Horário de início deve ser um número' })
  startTime: number;

  @IsNumber({}, { message: 'Horário de término deve ser um número' })
  endTime: number;

  @IsOptional()
  @IsString({ message: 'Observações devem ser uma string' })
  notes?: string;

  @IsOptional()
  @IsEnum(BookingStatus, {
    message: `Status deve ser um dos valores: ${Object.values(BookingStatus).join(', ')}`,
  })
  status?: BookingStatus;
}

export class UpdateBookingDTO extends PartialType(CreateBookingDTO) {}
