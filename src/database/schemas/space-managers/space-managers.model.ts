import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Representa o vínculo de um usuário como responsável por um espaço.
 *
 * @property {number} spaceId - ID do espaço.
 * @property {number} userId - ID do usuário responsável.
 * @property {number} companyId - ID da empresa.
 * @property {Date} createdAt - Data de criação do vínculo.
 * @property {Date} updatedAt - Data de atualização do vínculo.
 */
export interface SpaceManager extends IEntity {
  spaceId: number;
  userId: number;
  companyId: number;
  createdAt: Date;
  updatedAt: Date;
}
