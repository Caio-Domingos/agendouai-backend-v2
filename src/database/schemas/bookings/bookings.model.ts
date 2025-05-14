import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { Space } from '../spaces/spaces.model';
import { User } from '../users/users.model';
import { Company } from '../companies/companies.model';

/**
 * Enum para os possíveis status de uma reserva.
 */
export enum BookingStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
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
  // Not null
  weekdayIndex: number;
  bookingDate: Date;
  startTime: number;
  endTime: number;

  status: BookingStatus;
  statusUpdatedAt: Date;

  // Nullable
  notes?: string;

  // FK
  spaceId: number;
  userId: number;
  companyId: number;
  // spaceId, userId, companyId já estão acima

  // Relationships
  space?: Space;
  user?: User;
  company?: Company;
}
