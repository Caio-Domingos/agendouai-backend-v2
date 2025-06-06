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
import { SpaceManagersService } from '../space-managers/space-managers.service';
import { UserPermission } from 'src/database/schemas/users/users.model';
import { UsersService } from '../users/users.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class BookingsService extends CrudQueryService<
  BookingEntity,
  CreateBookingDTO,
  UpdateBookingDTO
> {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    private bookingsRepository: BookingsRepository,
    private spacesService: SpacesService,
    private availabilitiesService: AvailabilitiesService,
    private spaceManagersService: SpaceManagersService,
    private usersService: UsersService,
  ) {
    super(bookingsRepository);
  }

  /**
   * Sobrescreve o método create do serviço base para adicionar validações
   */
  async create(dto: CreateBookingDTO, context?: any): Promise<BookingEntity> {
    const user = context?.user;
    this.logger.debug('Iniciando criação de booking', dto);
    try {
      if (!(await this.canUserManageBooking({ user, dto }))) {
        this.logger.warn('Permissão negada para criar booking', { user, dto });
        throw new ForbiddenException(
          'Você não tem permissão para criar este agendamento',
        );
      }
      this.logger.debug('Permissão validada para criar booking');
      await this.validateBookingData(dto);
      this.logger.debug('Dados do booking validados');
      await this.checkSpaceAvailability(dto);
      this.logger.debug('Disponibilidade do espaço validada');
      await this.checkBookingConflicts(dto);
      this.logger.debug('Conflitos de booking validados');
      if (!dto.status) {
        dto.status = BookingStatus.PENDING;
      }
      this.logger.debug('Booking validado, criando...', dto);
      const result = await super.create(dto, context);
      this.logger.debug('Booking criado com sucesso', result);
      return result;
    } catch (error) {
      this.logger.error('Erro ao criar booking', { error, dto });
      throw error;
    }
  }

  /**
   * Sobrescreve o método update do serviço base para adicionar validações
   */
  async update(
    id: number,
    dto: UpdateBookingDTO,
    context?: any,
  ): Promise<BookingEntity> {
    const user = context?.user;
    this.logger.debug(`Iniciando update do booking ${id}`, dto);
    try {
      const booking = await this.findById(id);
      if (!booking) {
        this.logger.warn(`Booking ${id} não encontrado`);
        throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
      }
      if (!(await this.canUserManageBooking({ user, booking }))) {
        this.logger.warn('Permissão negada para editar booking', { user, booking });
        throw new ForbiddenException(
          'Você não tem permissão para editar este agendamento',
        );
      }
      this.logger.debug('Permissão validada para editar booking');
      if (dto.status && dto.status !== booking.status) {
        await this.validateStatusChange(booking, dto.status);
        this.logger.debug('Transição de status validada');
      }
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
        this.logger.debug('Validando dados de update de booking', updatedDto);
        await this.validateBookingData(updatedDto as CreateBookingDTO);
        this.logger.debug('Dados de update validados');
        await this.checkSpaceAvailability(updatedDto as CreateBookingDTO);
        this.logger.debug('Disponibilidade de update validada');
        await this.checkBookingConflicts(updatedDto as CreateBookingDTO, id);
        this.logger.debug('Conflitos de update validados');
      }
      if (dto.status && dto.status !== booking.status && !dto.statusUpdatedAt) {
        dto = {
          ...dto,
          statusUpdatedAt: new Date().toISOString(),
        };
      }
      this.logger.debug(`Finalizando update do booking ${id}`, dto);
      const result = await super.update(id, dto, context);
      this.logger.debug(`Booking ${id} atualizado com sucesso`, result);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao atualizar booking ${id}`, { error, dto });
      throw error;
    }
  }

  /**
   * Cancela um agendamento
   */
  async cancelBooking(id: number, context?: any): Promise<BookingEntity> {
    const user = context?.user;
    this.logger.debug(`Iniciando cancelamento do booking ${id}`);
    try {
      const booking = await this.findById(id);
      if (!booking) {
        this.logger.warn(`Booking ${id} não encontrado para cancelamento`);
        throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
      }
      if (!(await this.canUserManageBooking({ user, booking }))) {
        this.logger.warn('Permissão negada para cancelar booking', { user, booking });
        throw new ForbiddenException(
          'Você não tem permissão para cancelar este agendamento',
        );
      }
      this.logger.debug('Permissão validada para cancelar booking');
      await this.validateCancellationDeadline(booking);
      this.logger.debug(`Booking ${id} validado para cancelamento`);
      const result = await this.update(id, { status: BookingStatus.CANCELED }, context);
      this.logger.debug(`Booking ${id} cancelado com sucesso`, result);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao cancelar booking ${id}`, { error });
      throw error;
    }
  }

  /**
   * Valida os dados básicos do agendamento
   */
  private async validateBookingData(dto: CreateBookingDTO): Promise<void> {
    this.logger.debug('Validando dados básicos do booking', dto);
    try {
      const space = await this.spacesService.findById(dto.spaceId);
      if (!space) {
        this.logger.warn('Espaço não encontrado', { spaceId: dto.spaceId });
        throw new NotFoundException(
          `Espaço com ID ${dto.spaceId} não encontrado`,
        );
      }
      this.logger.debug('Espaço encontrado', { spaceId: dto.spaceId });
      const bookingDate = parseISO(dto.bookingDate);
      if (bookingDate < new Date()) {
        this.logger.warn('Data do agendamento não é futura', { bookingDate });
        throw new BadRequestException('A data do agendamento deve ser futura.');
      }
      this.logger.debug('Data do agendamento é futura', { bookingDate });
      if (dto.startTime >= dto.endTime) {
        this.logger.warn('Horário de início não é anterior ao de término', { startTime: dto.startTime, endTime: dto.endTime });
        throw new BadRequestException(
          'O horário de início deve ser anterior ao horário de término.',
        );
      }
      this.logger.debug('Horário de início e término válidos', { startTime: dto.startTime, endTime: dto.endTime });
    } catch (error) {
      this.logger.error('Erro ao validar dados do booking', { error, dto });
      throw error;
    }
  }

  /**
   * Verifica disponibilidade do espaço no dia e horário solicitado
   */
  private async checkSpaceAvailability(dto: CreateBookingDTO): Promise<void> {
    this.logger.debug('Verificando disponibilidade do espaço', dto);
    try {
      let availability = await this.availabilitiesService
        .findWithOptions({
          filters: [
            { field: 'spaceId', operator: FilterOperator.EQUALS, value: dto.spaceId },
            { field: 'weekdayIndex', operator: FilterOperator.EQUALS, value: dto.weekdayIndex },
          ],
          pagination: { page: 1, size: 1 },
        })
        .then((result) => result.items[0]);
      this.logger.debug('Resultado da busca de disponibilidade', { availability });
      if (!availability) {
        this.logger.warn('Nenhuma disponibilidade encontrada para o espaço/dia, buscando disponibilidade default da empresa', { spaceId: dto.spaceId, weekdayIndex: dto.weekdayIndex });
        const space = await this.spacesService.findById(dto.spaceId);
        availability = await this.availabilitiesService
          .findWithOptions({
            filters: [
              { field: 'spaceId', operator: FilterOperator.EQUALS, value: null },
              { field: 'companyId', operator: FilterOperator.EQUALS, value: space.companyId },
              { field: 'weekdayIndex', operator: FilterOperator.EQUALS, value: dto.weekdayIndex },
            ],
            pagination: { page: 1, size: 1 },
          })
          .then((result) => result.items[0]);
        this.logger.debug('Resultado da busca de disponibilidade default', { availability });
        if (!availability) {
          this.logger.error('Não há disponibilidade configurada para este dia da semana', { spaceId: dto.spaceId, weekdayIndex: dto.weekdayIndex });
          throw new BadRequestException(
            `Não há disponibilidade configurada para este dia da semana.`,
          );
        }
      }
      this.logger.debug('Disponibilidade encontrada', { availability });
      if (!availability.isOpen) {
        this.logger.warn('Espaço não está aberto neste dia', { availability });
        throw new BadRequestException(
          `O espaço está fechado neste dia da semana (${availability.weekday || dto.weekdayIndex}).`,
        );
      }
      this.logger.debug('Espaço está aberto neste dia', { availability });
      if (!availability.is24Hours) {
        if (dto.startTime < availability.openingTime) {
          this.logger.warn('Tentativa de agendar antes do horário de abertura', { startTime: dto.startTime, openingTime: availability.openingTime });
          throw new BadRequestException(
            `O espaço só abre às ${String(Math.floor(availability.openingTime / 60)).padStart(2, '0')}:${String(availability.openingTime % 60).padStart(2, '0')}.`,
          );
        }
        if (dto.endTime > availability.closingTime) {
          this.logger.warn('Tentativa de agendar após o horário de fechamento', { endTime: dto.endTime, closingTime: availability.closingTime });
          throw new BadRequestException(
            `O espaço fecha às ${String(Math.floor(availability.closingTime / 60)).padStart(2, '0')}:${String(availability.closingTime % 60).padStart(2, '0')}.`,
          );
        }
      }
      this.logger.debug('Horário solicitado dentro do período disponível', { startTime: dto.startTime, endTime: dto.endTime, openingTime: availability.openingTime, closingTime: availability.closingTime });
      const durationMinutes = dto.endTime - dto.startTime;
      if (durationMinutes % availability.intervalMinutes !== 0) {
        this.logger.warn('Duração do agendamento não é múltipla do intervalo mínimo', { durationMinutes, intervalMinutes: availability.intervalMinutes });
        throw new BadRequestException(
          `A duração do agendamento deve ser múltipla de ${availability.intervalMinutes} minutos.`,
        );
      }
      this.logger.debug('Duração do agendamento válida', { durationMinutes, intervalMinutes: availability.intervalMinutes });
    } catch (error) {
      this.logger.error('Erro ao verificar disponibilidade do espaço', { error, dto });
      throw error;
    }
  }

  /**
   * Verifica conflitos com outros agendamentos
   */
  private async checkBookingConflicts(
    dto: CreateBookingDTO,
    excludeId?: number,
  ): Promise<void> {
    this.logger.debug('Verificando conflitos de booking', { dto, excludeId });
    try {
      const bookingDate = parseISO(dto.bookingDate);
      const conflictingBookings =
        await this.bookingsRepository.findConflictingBookings(
          dto.spaceId,
          bookingDate,
          dto.startTime,
          dto.endTime,
          excludeId,
        );
      const space = await this.spacesService.findById(dto.spaceId);
      if (conflictingBookings.length > 0 && !space.multipleBookings) {
        this.logger.warn('Conflito de agendamento detectado', { conflictingBookings });
        throw new ConflictException(
          `Já existe um agendamento para este espaço neste horário.`,
        );
      }
      this.logger.debug('Nenhum conflito de agendamento detectado');
    } catch (error) {
      this.logger.error('Erro ao verificar conflitos de booking', { error, dto });
      throw error;
    }
  }

  /**
   * Valida se a mudança de status é permitida
   */
  private async validateStatusChange(
    booking: BookingEntity,
    newStatus: BookingStatus,
  ): Promise<void> {
    this.logger.debug('Validando transição de status', { booking, newStatus });
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
    this.logger.debug('Validando prazo mínimo de cancelamento', booking);
    // Buscar a disponibilidade para saber o prazo mínimo de cancelamento
    let availability = await this.availabilitiesService
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
      // Busca disponibilidade default da empresa
      const space = await this.spacesService.findById(booking.spaceId);
      availability = await this.availabilitiesService
        .findWithOptions({
          filters: [
            { field: 'spaceId', operator: FilterOperator.EQUALS, value: null },
            {
              field: 'companyId',
              operator: FilterOperator.EQUALS,
              value: space.companyId,
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
   * Verifica se o usuário tem permissão para criar/editar/cancelar o booking
   */
  private async canUserManageBooking({
    user,
    booking,
    dto,
  }: {
    user: any;
    booking?: BookingEntity;
    dto?: CreateBookingDTO | UpdateBookingDTO;
  }): Promise<boolean> {
    this.logger.debug('Verificando permissão do usuário para booking', { user, booking, dto });
    // Busca usuário completo
    const dbUser = await this.usersService.findById(user.sub);
    if (!dbUser) return false;
    // Admin pode tudo
    if (dbUser.permission === UserPermission.ADMIN) return true;
    // Company só na empresa
    if (
      dbUser.permission === UserPermission.MANAGER &&
      ((booking && dbUser.companyId === booking.companyId) ||
        (dto && dbUser.companyId === dto.companyId))
    )
      return true;
    // Funcionário só nos espaços que gerencia
    if (dbUser.permission === UserPermission.EMPLOYEE) {
      const spaceId = booking?.spaceId || dto?.spaceId;
      if (spaceId) {
        const result = await this.spaceManagersService.findWithOptions({
          filters: [
            {
              field: 'userId',
              operator: FilterOperator.EQUALS,
              value: dbUser.id,
            },
            {
              field: 'spaceId',
              operator: FilterOperator.EQUALS,
              value: spaceId,
            },
          ],
          pagination: { page: 1, size: 1 },
        });
        if (result.items.length > 0) return true;
      }
    }
    // Cliente só para si
    const userId = dbUser.id;
    if (
      (booking && booking.userId === userId) ||
      (dto && dto['userId'] === userId)
    )
      return true;
    return false;
  }
}
