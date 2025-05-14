import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { Space } from '../spaces/spaces.model';
import { Company } from '../companies/companies.model';

/**
 * Representa a disponibilidade de um espaço para reservas.
 *
 * @property {boolean} active - Indica se a disponibilidade está ativa.
 * @property {number} minDaysCancel - Dias mínimos para cancelamento.
 * @property {number} weekdayIndex - Índice do dia da semana (0=Domingo, 6=Sábado).
 * @property {number} intervalMinutes - Intervalo em minutos para reservas.
 * @property {number} spaceId - ID do espaço relacionado.
 * @property {number} openingTime - Horário de abertura (ex: 800 para 08:00).
 * @property {number} closingTime - Horário de fechamento (ex: 1800 para 18:00).
 * @property {string} weekday - Nome do dia da semana.
 * @property {number} companyId - ID da empresa.
 */
export interface Availability extends IEntity {
  // Not null
  openingTime: number;
  closingTime: number;
  weekday: string;
  companyId: number;

  // Nullable
  active?: boolean;
  minDaysCancel?: number;
  weekdayIndex?: number;
  intervalMinutes?: number;
  spaceId?: number;

  // FK
  // companyId, spaceId já estão acima

  // Relationships
  space?: Space;
  company?: Company;
}
