import { IEntity } from 'src/shared/database/interfaces/entity.interface';

import { Answer } from '../answers/answers.model';
import { Page } from '../pages/pages.model';
import { Question } from '../questions/questions.model';

export enum AlertCompType {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  GREATER_THAN = 'greaterThan',
  LESS_THAN = 'lessThan',
  CONTAINS = 'contains',
}

export interface QuestionAlert {
  comp: AlertCompType;
  valueExpected: string | number | boolean | Date | null;
}

/**
 * Representa a relação entre uma página e uma questão no sistema.
 *
 * Esta interface define a estrutura de como uma questão é vinculada a uma página,
 * juntamente com suas configurações específicas, como prioridade, obrigatoriedade e alertas.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 *
 * @property {number} pageId - ID da página à qual esta questão está vinculada
 * @property {number} questionId - ID da questão que está sendo vinculada
 * @property {number} priority - Número que define a ordem da questão na página
 * @property {boolean} required - Indica se a questão é obrigatória para ser respondida
 * @property {object} configuration - Configurações específicas para esta instância da questão
 * @property {Array} alerts - Lista de alertas ou validações adicionais para esta questão
 * @property {Answer[]} answers - Respostas fornecidas para esta questão em páginas
 */
export interface PageQuestion extends IEntity {
  pageId: number;
  questionId: number;
  priority: number;
  required: boolean;
  configuration: Record<string, any>;
  alerts: Array<QuestionAlert>;

  page?: Page;
  question?: Question;
  answers?: Answer[];
}
