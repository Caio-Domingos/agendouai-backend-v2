import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { People } from '../people/people.model';
import { Company } from '../companies/companies.model';
import { SpaceManager } from '../space-managers/space-managers.model';

/**
 * User status enum.
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/**
 * User permission enum.
 */
export enum UserPermission {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  USER = 'user',
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
  createdBy?: number;
  updatedBy?: number;
  permission: UserPermission;
  username: string;
  password: string;

  // Nullable
  status: UserStatus;
  resetCode?: string;
  pushToken?: string;

  // FK
  companyId?: number;
  peopleId?: number;

  // Relationships
  company?: Company;
  people?: People;
  spaceManagers?: SpaceManager[];
}
