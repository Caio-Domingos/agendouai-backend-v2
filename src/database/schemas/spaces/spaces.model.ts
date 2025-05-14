import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Enum de status do espaço.
 */
export enum SpaceStatus {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
  PENDENTE = 'pendente',
  CANCELADO = 'cancelado',
  CONCLUIDO = 'concluido',
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
  status?: SpaceStatus;
  multipleBookings?: boolean;
  photoUrl?: string;
  companyId: number;
  name: string;
  createdBy: number;
  updatedBy: number;
}
