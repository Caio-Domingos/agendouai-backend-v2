import { IEntity } from 'src/shared/database/interfaces/entity.interface';

import { Company } from '../companies/companies.model';
import { Page } from '../pages/pages.model';
import { Submission } from '../submissions/submissions.model';

export enum QuestionnaireStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

/**
 * Representa uma entidade de questionário no sistema.
 *
 * Esta interface define a estrutura principal de um registro de questionário no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * Os questionários são usados para coletar feedback dos usuários no sistema NPS.
 *
 * @property {string} title - Título do questionário
 * @property {string} description - Descrição detalhada do questionário (opcional)
 * @property {QuestionnaireStatus} status - Status atual do questionário (rascunho ou publicado)
 * @property {Date} createdAt - Data e hora de criação do questionário
 * @property {number} companyId - ID da empresa à qual este questionário pertence (opcional)
 *
 * Relacionamentos:
 * @property {Company} company - Empresa à qual este questionário está vinculado
 * @property {Page[]} pages - Páginas do questionário
 * @property {Submission[]} submissions - Submissões feitas para este questionário
 */
export interface Questionnaire extends IEntity {
  // Propriedades principais
  title: string;
  description?: string;
  status: QuestionnaireStatus;
  createdAt: Date;
  companyId?: number;

  // Relacionamentos
  company?: Company;
  pages?: Page[];
  submissions?: Submission[];
}
