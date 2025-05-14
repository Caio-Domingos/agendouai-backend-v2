import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingStatusHistoryService } from './booking-status-history.service';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { BookingStatusHistoryEntity } from 'src/database/schemas/booking-status-history/booking-status-history.entity';
import {
  CreateBookingStatusHistoryDTO,
  UpdateBookingStatusHistoryDTO,
  BookingStatusHistoryDto,
} from 'src/database/schemas/booking-status-history/booking-status-history.dto';

// Cria o controlador base usando a função factory
const BookingStatusHistoryControllerBase = CrudQueryController<
  BookingStatusHistoryEntity,
  typeof CreateBookingStatusHistoryDTO,
  typeof UpdateBookingStatusHistoryDTO,
  typeof BookingStatusHistoryDto
>(
  'booking-status-history',
  CreateBookingStatusHistoryDTO,
  UpdateBookingStatusHistoryDTO,
  BookingStatusHistoryDto,
);

@ApiTags('Histórico de Status de Reserva')
@Controller('booking-status-history')
export class BookingStatusHistoryController extends BookingStatusHistoryControllerBase {
  constructor(
    readonly bookingStatusHistoryService: BookingStatusHistoryService,
  ) {
    super(bookingStatusHistoryService);
  }
}
