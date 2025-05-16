import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { Space } from '../spaces/spaces.model';
import { Company } from '../companies/companies.model';

export enum WeekDayIndex {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

// Array com os nomes dos dias, na ordem do enum
export const WEEKDAY_NAMES = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;

// Type que representa os nomes dos dias, sempre sincronizado com o enum
export type WeekDayName = (typeof WEEKDAY_NAMES)[number];

/**
 * Representa a disponibilidade de um espaço para reservas.
 *
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
  weekday: WeekDayName;
  weekdayIndex: WeekDayIndex;
  minDaysCancel: number;
  intervalMinutes: number;
  isOpen: boolean;
  is24Hours: boolean;
  configuration: Record<string, any>;

  // Nullable

  // FK
  companyId: number;
  spaceId?: number;
  // companyId, spaceId já estão acima

  // Relationships
  space?: Space;
  company?: Company;
}
