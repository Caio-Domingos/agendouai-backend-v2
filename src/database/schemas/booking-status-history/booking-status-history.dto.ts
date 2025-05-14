import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { BookingStatus } from './booking-status-history.model';

export class BookingStatusHistoryDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'ID da reserva deve ser um número inteiro' })
  bookingId: number;

  @IsEnum(BookingStatus, {
    message: `Status deve ser um dos valores: ${Object.values(BookingStatus).join(', ')}`,
  })
  status: BookingStatus;

  @IsOptional()
  statusDate?: Date;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;

  @IsNumber(
    {},
    { message: 'ID do usuário que alterou deve ser um número inteiro' },
  )
  changedBy: number;
}

export class CreateBookingStatusHistoryDTO {
  @IsNumber({}, { message: 'ID da reserva deve ser um número inteiro' })
  bookingId: number;

  @IsEnum(BookingStatus, {
    message: `Status deve ser um dos valores: ${Object.values(BookingStatus).join(', ')}`,
  })
  status: BookingStatus;

  @IsOptional()
  statusDate?: Date;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;

  @IsNumber(
    {},
    { message: 'ID do usuário que alterou deve ser um número inteiro' },
  )
  changedBy: number;
}

export class UpdateBookingStatusHistoryDTO extends PartialType(
  CreateBookingStatusHistoryDTO,
) {}
