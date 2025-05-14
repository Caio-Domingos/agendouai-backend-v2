import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from 'src/database/schemas/bookings/bookings.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from 'src/database/schemas/bookings/bookings.entity';

@Module({
  exports: [BookingsService],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
})
export class BookingsModule {}
