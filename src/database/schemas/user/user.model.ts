import { IEntity } from 'src/shared/database/interfaces/entity.interface';

import { Company } from '../companies/companies.model';
import { Unit } from '../units/units.model';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  // TODO: Add more statuses
}

export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  UNIT = 'UNIT',
  EMPLOYEE = 'EMPLOYEE',
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
 * @property {UserRole} role - Papel do usuário no sistema, definindo suas permissões
 * @property {number} companyId - ID da empresa à qual este usuário pertence (opcional)
 *
 * Relacionamentos:
 * @property {Company} company - Empresa à qual este usuário está vinculado
 */
export interface User extends IEntity {
  // Propriedades principais
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  role: UserRole;
  companyId?: number;
  unitId?: number;

  // Relacionamentos
  company?: Company;
  unit?: Unit;
}
