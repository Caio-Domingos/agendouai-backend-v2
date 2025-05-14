import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Representa uma categoria de empresa no sistema.
 *
 * @property {string} description - Descrição da categoria da empresa.
 * @property {string} partitionPrefix - Prefixo de partição para uso interno.
 */
export interface CompanyCategory extends IEntity {
  description: string;
  partitionPrefix?: string;
}
