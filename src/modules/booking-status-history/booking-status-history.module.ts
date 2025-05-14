import { Module } from '@nestjs/common';
import { BookingStatusHistoryService } from './booking-status-history.service';
import { BookingStatusHistoryController } from './booking-status-history.controller';
import { BookingStatusHistoryRepository } from 'src/database/schemas/booking-status-history/booking-status-history.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatusHistoryEntity } from 'src/database/schemas/booking-status-history/booking-status-history.entity';

@Module({
  exports: [BookingStatusHistoryService],
  controllers: [BookingStatusHistoryController],
  providers: [BookingStatusHistoryService, BookingStatusHistoryRepository],
})
export class BookingStatusHistoryModule {}
