import { IEntity } from 'src/shared/database/interfaces/entity.interface';

import { Company } from '../companies/companies.model';
import { PageQuestion } from '../page-question/page-question.model';

/**
 * Enum que define os tipos possíveis de questões no sistema.
 */
export enum QuestionType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  FILE = 'FILE',
  CHOICE = 'CHOICE',
}

/**
 * Representa uma entidade de questão no sistema.
 *
 * Esta interface define a estrutura principal de uma questão no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * As questões são componentes fundamentais dos questionários no sistema NPS.
 *
 * @property {string} slug - Identificador único da questão em formato amigável para URL
 * @property {string} title - Título da questão
 * @property {string} description - Descrição detalhada da questão (opcional)
 * @property {QuestionType} type - Tipo da questão que define como será respondida
 * @property {object} configuration - Configurações específicas da questão em formato JSON
 * @property {number} companyId - ID da empresa à qual esta questão pertence (opcional)
 *
 * Relacionamentos:
 * @property {Company} company - Empresa à qual esta questão está vinculada
 * @property {PageQuestion[]} pageQuestions - As páginas às quais esta questão está vinculada
 */
export interface Question extends IEntity {
  // Propriedades principais
  slug: string;
  title: string;
  description?: string;
  type: QuestionType;
  configuration: Record<string, any>;
  companyId?: number;

  // Relacionamentos
  company?: Company;
  pageQuestions?: PageQuestion[];
}
