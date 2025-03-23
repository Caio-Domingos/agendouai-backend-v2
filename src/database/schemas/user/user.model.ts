import { IEntity } from 'src/shared/database/interfaces/entity.interface';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  // TODO: Add more statuses
}

export interface User extends IEntity {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
}
