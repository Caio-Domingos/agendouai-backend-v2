import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { BookingEntity } from 'src/database/schemas/bookings/bookings.entity';
import {
  CreateBookingDTO,
  UpdateBookingDTO,
} from 'src/database/schemas/bookings/bookings.dto';
import { BookingsRepository } from 'src/database/schemas/bookings/bookings.repository';

@Injectable()
export class BookingsService extends CrudQueryService<
  BookingEntity,
  CreateBookingDTO,
  UpdateBookingDTO
> {
  constructor(private bookingsRepository: BookingsRepository) {
    super(bookingsRepository);
  }
}
