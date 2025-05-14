import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { BookingEntity } from './bookings.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreateBookingDTO, UpdateBookingDTO } from './bookings.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BookingsRepository extends CrudQueryRepository<
  BookingEntity,
  CreateBookingDTO,
  UpdateBookingDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, BookingEntity);
  }
}
