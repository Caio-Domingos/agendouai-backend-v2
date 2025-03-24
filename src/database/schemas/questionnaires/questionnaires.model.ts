import { IEntity } from 'src/shared/database/interfaces/entity.interface';

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
 * @property {number} createdBy - ID do usuário que criou o questionário
 * @property {Date} createdAt - Data e hora de criação do questionário
 */
export interface Questionnaire extends IEntity {
  title: string;
  description?: string;
  status: QuestionnaireStatus;
  createdBy: number;
  createdAt: Date;
}
