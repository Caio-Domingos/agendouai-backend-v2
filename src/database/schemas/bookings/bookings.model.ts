import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Enum para os possíveis status de uma reserva.
 */
export enum BookingStatus {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
  PENDENTE = 'pendente',
  CANCELADO = 'cancelado',
  CONCLUIDO = 'concluido',
}

/**
 * Representa uma reserva de espaço no sistema.
 *
 * @property {Date} bookingDate - Data/hora da reserva
 * @property {number} weekdayIndex - Índice do dia da semana
 * @property {number} spaceId - ID do espaço reservado
 * @property {number} userId - ID do usuário que fez a reserva
 * @property {number} companyId - ID da empresa associada
 * @property {number} startTime - Horário de início da reserva
 * @property {number} endTime - Horário de término da reserva
 * @property {string} notes - Observações da reserva
 * @property {BookingStatus} status - Status atual da reserva
 * @property {Date} statusUpdatedAt - Data/hora da última atualização de status
 */
export interface Booking extends IEntity {
  bookingDate: Date;
  weekdayIndex?: number;
  spaceId: number;
  userId: number;
  companyId: number;
  startTime: number;
  endTime: number;
  notes?: string;
  status: BookingStatus;
  statusUpdatedAt: Date;
}
