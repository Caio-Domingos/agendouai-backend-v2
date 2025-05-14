import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { BookingStatusHistoryEntity } from 'src/database/schemas/booking-status-history/booking-status-history.entity';
import {
  CreateBookingStatusHistoryDTO,
  UpdateBookingStatusHistoryDTO,
} from 'src/database/schemas/booking-status-history/booking-status-history.dto';
import { BookingStatusHistoryRepository } from 'src/database/schemas/booking-status-history/booking-status-history.repository';

@Injectable()
export class BookingStatusHistoryService extends CrudQueryService<
  BookingStatusHistoryEntity,
  CreateBookingStatusHistoryDTO,
  UpdateBookingStatusHistoryDTO
> {
  constructor(
    private bookingStatusHistoryRepository: BookingStatusHistoryRepository,
  ) {
    super(bookingStatusHistoryRepository);
  }
}
