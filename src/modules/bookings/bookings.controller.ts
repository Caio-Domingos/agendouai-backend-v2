import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { BookingEntity } from 'src/database/schemas/bookings/bookings.entity';
import {
  CreateBookingDTO,
  UpdateBookingDTO,
  BookingDto,
} from 'src/database/schemas/bookings/bookings.dto';
import { Post, Param } from '@nestjs/common';
import { Ctx } from 'src/auth/decorators/context.decorator';

// Cria o controlador base usando a função factory
const BookingsControllerBase = CrudQueryController<
  BookingEntity,
  typeof CreateBookingDTO,
  typeof UpdateBookingDTO,
  typeof BookingDto
>('bookings', CreateBookingDTO, UpdateBookingDTO, BookingDto);

@ApiTags('Reservas')
@Controller('bookings')
export class BookingsController extends BookingsControllerBase {
  constructor(readonly bookingsService: BookingsService) {
    super(bookingsService);
  }

  @Post(':id/cancel')
  async cancelBooking(@Param('id') id: number, @Ctx() context: any) {
    return this.bookingsService.cancelBooking(id, context);
  }
}
