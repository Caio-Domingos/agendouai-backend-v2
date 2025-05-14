import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { BookingStatusHistoryEntity } from './booking-status-history.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  CreateBookingStatusHistoryDTO,
  UpdateBookingStatusHistoryDTO,
} from './booking-status-history.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BookingStatusHistoryRepository extends CrudQueryRepository<
  BookingStatusHistoryEntity,
  CreateBookingStatusHistoryDTO,
  UpdateBookingStatusHistoryDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, BookingStatusHistoryEntity);
  }
}
