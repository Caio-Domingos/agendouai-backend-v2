import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { BookingEntity } from 'src/database/schemas/bookings/bookings.entity';
import {
  CreateBookingDTO,
  UpdateBookingDTO,
} from 'src/database/schemas/bookings/bookings.dto';
import { BookingsRepository } from 'src/database/schemas/bookings/bookings.repository';
import { SpacesService } from '../spaces/spaces.service';
import { AvailabilitiesService } from '../availabilities/availabilities.service';
import { BookingStatus } from 'src/database/schemas/bookings/bookings.model';
import { differenceInCalendarDays, parseISO, format } from 'date-fns';
import { FilterOperator } from 'src/shared/crud/interfaces/crud.types';

@Injectable()
export class BookingsService extends CrudQueryService<
  BookingEntity,
  CreateBookingDTO,
  UpdateBookingDTO
> {
  constructor(
    private bookingsRepository: BookingsRepository,
    private spacesService: SpacesService,
    private availabilitiesService: AvailabilitiesService,
  ) {
    super(bookingsRepository);
  }

  /**
   * Sobrescreve o método create do serviço base para adicionar validações
   */
  async create(dto: CreateBookingDTO): Promise<BookingEntity> {
    // Validar os dados do agendamento
    await this.validateBookingData(dto);

    // Verificar disponibilidade do espaço
    await this.checkSpaceAvailability(dto);

    // Verificar conflitos com outros agendamentos
    await this.checkBookingConflicts(dto);

    // Define o status inicial como PENDING se não for especificado
    if (!dto.status) {
      dto.status = BookingStatus.PENDING;
    }

    return super.create(dto);
  }

  /**
   * Sobrescreve o método update do serviço base para adicionar validações
   */
  async update(id: number, dto: UpdateBookingDTO): Promise<BookingEntity> {
    const booking = await this.findById(id);
    if (!booking) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }

    // Verificar se o status está sendo alterado
    if (dto.status && dto.status !== booking.status) {
      await this.validateStatusChange(booking, dto.status);
    }

    // Se estiver alterando data/hora, verificar disponibilidade e conflitos
    if (dto.bookingDate || dto.startTime || dto.endTime) {
      const updatedDto = {
        ...booking,
        ...dto,
        bookingDate:
          dto.bookingDate || format(booking.bookingDate, 'yyyy-MM-dd'),
        startTime:
          dto.startTime !== undefined ? dto.startTime : booking.startTime,
        endTime: dto.endTime !== undefined ? dto.endTime : booking.endTime,
        weekdayIndex:
          dto.weekdayIndex !== undefined
            ? dto.weekdayIndex
            : booking.weekdayIndex,
      };

      await this.validateBookingData(updatedDto as CreateBookingDTO);
      await this.checkSpaceAvailability(updatedDto as CreateBookingDTO);

      // Verificar conflitos excluindo o agendamento atual
      await this.checkBookingConflicts(updatedDto as CreateBookingDTO, id);
    }

    // Atualizar a data de atualização de status se o status foi alterado e statusUpdatedAt não foi fornecido
    if (dto.status && dto.status !== booking.status && !dto.statusUpdatedAt) {
      dto = {
        ...dto,
        statusUpdatedAt: new Date().toISOString(),
      };

      // Aqui você poderia adicionar lógica para registrar a mudança de status no histórico
      // await this.bookingStatusHistoryService.create({
      //   bookingId: id,
      //   oldStatus: booking.status,
      //   newStatus: dto.status,
      //   userId: this.getUserId(),
      // });
    }

    return super.update(id, dto);
  }

  /**
   * Encontra todos os agendamentos para um espaço em uma data específica
   */
  async findBySpaceAndDate(
    spaceId: number,
    date: string,
  ): Promise<BookingEntity[]> {
    return this.bookingsRepository.findBySpaceAndDate(spaceId, parseISO(date));
  }

  /**
   * Encontra todos os agendamentos de um usuário
   */
  async findByUser(userId: number): Promise<BookingEntity[]> {
    return this.bookingsRepository.findByUser(userId);
  }

  /**
   * Cancela um agendamento
   */
  async cancelBooking(id: number, userId: number): Promise<BookingEntity> {
    const booking = await this.findById(id);

    if (!booking) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }

    // Verificar se o agendamento pertence ao usuário
    if (booking.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para cancelar este agendamento',
      );
    }

    // Verificar o limite mínimo de dias para cancelamento
    await this.validateCancellationDeadline(booking);

    return this.update(id, {
      status: BookingStatus.CANCELED,
    });
  }

  /**
   * Valida os dados básicos do agendamento
   */
  private async validateBookingData(dto: CreateBookingDTO): Promise<void> {
    // Verificar se o espaço existe
    const space = await this.spacesService.findById(dto.spaceId);
    if (!space) {
      throw new NotFoundException(
        `Espaço com ID ${dto.spaceId} não encontrado`,
      );
    }

    // Verificar se a data é futura
    const bookingDate = parseISO(dto.bookingDate);
    if (bookingDate < new Date()) {
      throw new BadRequestException('A data do agendamento deve ser futura');
    }

    // Verificar se o horário de início é antes do horário de término
    if (dto.startTime >= dto.endTime) {
      throw new BadRequestException(
        'O horário de início deve ser anterior ao horário de término',
      );
    }
  }

  /**
   * Verifica disponibilidade do espaço no dia e horário solicitado
   */
  private async checkSpaceAvailability(dto: CreateBookingDTO): Promise<void> {
    // Buscar a disponibilidade do espaço para o dia da semana
    const availability = await this.availabilitiesService
      .findWithOptions({
        filters: [
          {
            field: 'spaceId',
            operator: FilterOperator.EQUALS,
            value: dto.spaceId,
          },
          {
            field: 'weekdayIndex',
            operator: FilterOperator.EQUALS,
            value: dto.weekdayIndex,
          },
        ],
        pagination: { page: 1, size: 1 },
      })
      .then((result) => result.items[0]);

    if (!availability) {
      throw new BadRequestException(
        `Não há disponibilidade configurada para este dia da semana`,
      );
    }

    // Verificar se o espaço está aberto neste dia
    if (!availability.isOpen) {
      throw new BadRequestException(
        `O espaço não está disponível neste dia da semana`,
      );
    }

    // Verificar se o horário está dentro do intervalo disponível
    if (!availability.is24Hours) {
      if (
        dto.startTime < availability.openingTime ||
        dto.endTime > availability.closingTime
      ) {
        throw new BadRequestException(
          `O horário solicitado está fora do período disponível (${availability.openingTime / 60} - ${availability.closingTime / 60} horas)`,
        );
      }
    }

    // Verificar se o horário respeita o intervalo mínimo
    const durationMinutes = dto.endTime - dto.startTime;
    // TODO: Verificar se o intervalo mínimo é maior que o permitido. Tem isso configurado no espaco/empresa?
    if (durationMinutes % availability.intervalMinutes !== 0) {
      throw new BadRequestException(
        `A duração do agendamento deve ser múltipla do intervalo mínimo (${availability.intervalMinutes} minutos)`,
      );
    }
  }

  /**
   * Verifica conflitos com outros agendamentos
   */
  private async checkBookingConflicts(
    dto: CreateBookingDTO,
    excludeId?: number,
  ): Promise<void> {
    const bookingDate = parseISO(dto.bookingDate);
    const conflictingBookings =
      await this.bookingsRepository.findConflictingBookings(
        dto.spaceId,
        bookingDate,
        dto.startTime,
        dto.endTime,
        excludeId,
      );

    // Verificar se o espaço permite múltiplos agendamentos no mesmo horário
    const space = await this.spacesService.findById(dto.spaceId);

    if (conflictingBookings.length > 0 && !space.multipleBookings) {
      throw new ConflictException(
        'Já existe um agendamento para este espaço neste horário',
      );
    }
  }

  /**
   * Valida se a mudança de status é permitida
   */
  private async validateStatusChange(
    booking: BookingEntity,
    newStatus: BookingStatus,
  ): Promise<void> {
    // Regras de transição de status
    const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
      [BookingStatus.PENDING]: [BookingStatus.ACTIVE, BookingStatus.CANCELED],
      [BookingStatus.ACTIVE]: [BookingStatus.COMPLETED, BookingStatus.CANCELED],
      [BookingStatus.COMPLETED]: [],
      [BookingStatus.CANCELED]: [],
      [BookingStatus.INACTIVE]: [BookingStatus.ACTIVE],
    };

    if (!allowedTransitions[booking.status].includes(newStatus)) {
      throw new BadRequestException(
        `Não é possível mudar o status de ${booking.status} para ${newStatus}`,
      );
    }

    // Se estiver cancelando, verificar prazo mínimo
    if (newStatus === BookingStatus.CANCELED) {
      await this.validateCancellationDeadline(booking);
    }
  }

  /**
   * Valida se o agendamento pode ser cancelado baseado no prazo mínimo
   */
  private async validateCancellationDeadline(
    booking: BookingEntity,
  ): Promise<void> {
    // Buscar a disponibilidade para saber o prazo mínimo de cancelamento
    const availability = await this.availabilitiesService
      .findWithOptions({
        filters: [
          {
            field: 'spaceId',
            operator: FilterOperator.EQUALS,
            value: booking.spaceId,
          },
          {
            field: 'weekdayIndex',
            operator: FilterOperator.EQUALS,
            value: booking.weekdayIndex,
          },
        ],
        pagination: { page: 1, size: 1 },
      })
      .then((result) => result.items[0]);

    if (!availability) {
      return; // Se não encontrar disponibilidade, permite o cancelamento
    }

    const daysUntilBooking = differenceInCalendarDays(
      booking.bookingDate,
      new Date(),
    );

    if (daysUntilBooking < availability.minDaysCancel) {
      throw new BadRequestException(
        `O cancelamento deve ser feito com pelo menos ${availability.minDaysCancel} dias de antecedência`,
      );
    }
  }

  /**
   * Obtém o ID do usuário autenticado da requisição
   */
  private getUserId(): number | undefined {
    return this.getUser()?.id;
  }
}
