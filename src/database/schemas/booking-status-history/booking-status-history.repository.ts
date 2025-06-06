import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { BookingStatusHistoryEntity } from './booking-status-history.entity';
import {
  CreateBookingStatusHistoryDTO,
  UpdateBookingStatusHistoryDTO,
} from './booking-status-history.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingStatusHistoryRepository extends CrudQueryRepository<
  BookingStatusHistoryEntity,
  CreateBookingStatusHistoryDTO,
  UpdateBookingStatusHistoryDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, BookingStatusHistoryEntity);
  }
}
