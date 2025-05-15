import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { Company } from '../companies/companies.model';

/**
 * Representa uma categoria de empresa no sistema.
 *
 * @property {string} description - Descrição da categoria da empresa.
 * @property {string} partitionPrefix - Prefixo de partição para uso interno.
 */
export interface CompanyCategory extends IEntity {
  // Not null
  description: string;

  // Nullable
  spacePrefix?: string;

  // FK
  // (none)

  // Relationships
  companies?: Company[];
}
