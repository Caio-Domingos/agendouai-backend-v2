import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { Company } from '../companies/companies.model';
import { Availability } from '../availabilities/availabilities.model';
import { Booking } from '../bookings/bookings.model';
import { SpaceManager } from '../space-managers/space-managers.model';

/**
 * Enum de status do espaço.
 */
export enum SpaceStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/**
 * Representa um espaço físico de uma empresa.
 *
 * @property {SpaceStatus} status - Status do espaço.
 * @property {boolean} multipleBookings - Permite múltiplas reservas simultâneas.
 * @property {string} photoUrl - URL da foto do espaço.
 * @property {number} companyId - ID da empresa proprietária do espaço.
 * @property {string} name - Nome do espaço.
 * @property {number} createdBy - ID do usuário que criou o espaço.
 * @property {number} updatedBy - ID do usuário que atualizou o espaço.
 */
export interface Space extends IEntity {
  // Not null
  name: string;
  createdBy: number;
  updatedBy: number;
  status: SpaceStatus;
  multipleBookings: boolean;

  // Nullable
  photoUrl?: string;

  // FK
  companyId: number;

  // Relationships
  company?: Company;
  availabilities?: Availability[];
  bookings?: Booking[];
  spaceManagers?: SpaceManager[];
}
