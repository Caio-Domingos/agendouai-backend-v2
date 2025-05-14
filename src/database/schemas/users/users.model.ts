import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Enum de status do usuário.
 */
export enum UserStatus {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
  PENDENTE = 'pendente',
  CANCELADO = 'cancelado',
  CONCLUIDO = 'concluido',
}

/**
 * Enum de permissão do usuário.
 */
export enum UserPermission {
  ADMIN = 'admin',
  GESTOR = 'gestor',
  USUARIO = 'usuario',
  VISITANTE = 'visitante',
}

/**
 * Representa um usuário do sistema.
 *
 * @property {UserStatus} status - Status do usuário.
 * @property {string} resetCode - Código de redefinição de senha.
 * @property {number} createdBy - ID do usuário que criou.
 * @property {number} updatedBy - ID do usuário que atualizou.
 * @property {UserPermission} permission - Permissão do usuário.
 * @property {number} companyId - ID da empresa.
 * @property {number} personId - ID da pessoa vinculada.
 * @property {string} username - Nome de usuário.
 * @property {string} password - Senha criptografada.
 * @property {string} pushToken - Token de push notification.
 */
export interface User extends IEntity {
  status?: UserStatus;
  resetCode?: string;
  createdBy: number;
  updatedBy: number;
  permission: UserPermission;
  companyId?: number;
  personId?: number;
  username: string;
  password: string;
  pushToken?: string;
}
