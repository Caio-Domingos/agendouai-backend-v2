import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import {
  DataSource,
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { BookingEntity } from './bookings.entity';
import { CreateBookingDTO, UpdateBookingDTO } from './bookings.dto';
import { Inject, Injectable } from '@nestjs/common';
import { BookingStatus } from './bookings.model';

@Injectable()
export class BookingsRepository extends CrudQueryRepository<
  BookingEntity,
  CreateBookingDTO,
  UpdateBookingDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, BookingEntity);
  }

  /**
   * Encontra todos os agendamentos para um espaço em uma data específica
   */
  async findBySpaceAndDate(
    spaceId: number,
    bookingDate: Date,
  ): Promise<BookingEntity[]> {
    return this.getRepository(BookingEntity).find({
      where: {
        spaceId,
        bookingDate,
        status: Not(BookingStatus.CANCELED),
      },
      order: {
        startTime: 'ASC',
      },
    });
  }

  /**
   * Encontra todos os agendamentos de um usuário
   */
  async findByUser(userId: number): Promise<BookingEntity[]> {
    return this.getRepository(BookingEntity).find({
      where: {
        userId,
      },
      order: {
        bookingDate: 'DESC',
        startTime: 'ASC',
      },
    });
  }

  /**
   * Busca agendamentos que possam conflitar com o horário informado
   */
  async findConflictingBookings(
    spaceId: number,
    bookingDate: Date,
    startTime: number,
    endTime: number,
    excludeId?: number,
  ): Promise<BookingEntity[]> {
    const conflictConditions: any = {
      spaceId,
      bookingDate,
      status: Not(BookingStatus.CANCELED),
    };

    // TODO: Fazer um index disso
    if (excludeId) {
      conflictConditions.id = Not(excludeId);
    }

    return this.getRepository(BookingEntity).find({
      where: [
        {
          ...conflictConditions,
          startTime: LessThanOrEqual(startTime),
          endTime: MoreThanOrEqual(startTime),
        },
        {
          ...conflictConditions,
          startTime: LessThanOrEqual(endTime),
          endTime: MoreThanOrEqual(endTime),
        },
        {
          ...conflictConditions,
          startTime: Between(startTime, endTime),
        },
        {
          ...conflictConditions,
          endTime: Between(startTime, endTime),
        },
      ],
    });
  }
}
