import { IEntity } from 'src/shared/database/interfaces/entity.interface';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  // TODO: Add more statuses
}

/**
 * Representa uma entidade de usuário no sistema.
 *
 * Esta interface define a estrutura principal de um registro de usuário no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * Os usuários são os principais atores dentro do sistema NPS, tendo capacidades
 * de autenticação e rastreamento de status.
 *
 * @property {string} name - Nome completo do usuário
 * @property {string} email - Endereço de e-mail único do usuário, usado para identificação e login
 * @property {string} password - Senha criptografada do usuário
 * @property {UserStatus} status - Status atual do usuário no sistema
 */
export interface User extends IEntity {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
}
