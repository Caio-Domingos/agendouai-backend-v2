import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { Company } from '../companies/companies.model';
import { User } from '../user/user.model';

/**
 * Status possíveis para uma unidade.
 */
export enum UnitStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

/**
 * Representa uma unidade vinculada a uma empresa.
 *
 * @property {string} name - Nome da unidade
 * @property {UnitStatus} status - Status atual da unidade
 * @property {number} companyId - ID da empresa à qual a unidade pertence
 */
export interface Unit extends IEntity {
  name: string;
  status: UnitStatus;
  companyId: number;

  // Relacionamentos
  company?: Company;
  users?: User[];
}
