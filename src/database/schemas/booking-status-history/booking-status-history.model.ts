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
 * Representa um registro de histórico de status de reserva.
 *
 * @property {number} bookingId - ID da reserva associada
 * @property {BookingStatus} status - Status da reserva neste histórico
 * @property {Date} statusDate - Data/hora em que o status foi registrado
 * @property {number} companyId - ID da empresa associada
 * @property {number} changedBy - ID do usuário que realizou a alteração
 */
export interface BookingStatusHistory extends IEntity {
  bookingId: number;
  status: BookingStatus;
  statusDate: Date;
  companyId: number;
  changedBy: number;
}
