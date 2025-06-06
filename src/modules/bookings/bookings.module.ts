import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from 'src/database/schemas/bookings/bookings.repository';
import { SpacesModule } from '../spaces/spaces.module';
import { AvailabilitiesModule } from '../availabilities/availabilities.module';
import { BookingStatusHistoryModule } from '../booking-status-history/booking-status-history.module';
import { SpaceManagersModule } from '../space-managers/space-managers.module';
import { UsersModule } from '../users/users.module';

@Module({
  exports: [BookingsService],
  controllers: [BookingsController],
  imports: [
    SpacesModule,
    AvailabilitiesModule,
    BookingStatusHistoryModule,
    SpaceManagersModule,
    UsersModule,
  ],
  providers: [BookingsService, BookingsRepository],
})
export class BookingsModule {}
