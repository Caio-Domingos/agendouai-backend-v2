import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { Person } from '../people/people.model';
import { Company } from '../companies/companies.model';

/**
 * User status enum.
 */
export enum UserStatus {
  ACTIVE = 'ativo',
  INACTIVE = 'inativo',
  PENDING = 'pendente',
  CANCELED = 'cancelado',
  COMPLETED = 'concluido',
}

/**
 * User permission enum.
 */
export enum UserPermission {
  ADMIN = 'admin',
  MANAGER = 'gestor',
  EMPLOYEE = 'funcionario',
  USER = 'usuario',
}

/**
 * Represents a system user.
 *
 * @property {UserStatus} status - User status.
 * @property {string} resetCode - Password reset code.
 * @property {number} createdBy - ID of the user who created.
 * @property {number} updatedBy - ID of the user who updated.
 * @property {UserPermission} permission - User permission.
 * @property {number} companyId - Company ID.
 * @property {number} personId - Linked person ID.
 * @property {string} username - Username.
 * @property {string} password - Encrypted password.
 * @property {string} pushToken - Push notification token.
 * @property {Person} person - Linked person.
 * @property {Company} company - Linked company.
 */
export interface User extends IEntity {
  // Not null
  createdBy: number;
  updatedBy: number;
  permission: UserPermission;
  username: string;
  password: string;

  // Nullable
  status?: UserStatus;
  resetCode?: string;
  pushToken?: string;

  // FK
  companyId?: number;
  personId?: number;

  // Relationships
  company?: Company;
  person?: Person;
}
