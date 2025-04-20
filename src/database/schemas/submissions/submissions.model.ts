import { IEntity } from 'src/shared/database/interfaces/entity.interface';

import { Alert } from '../alerts/alerts.model';
import { Answer } from '../answers/answers.model';
import { Company } from '../companies/companies.model';
import { Questionnaire } from '../questionnaires/questionnaires.model';

/**
 * Enum que define os status possíveis de uma submissão no sistema.
 */
export enum SubmissionStatus {
  PARTIAL = 'partial',
  COMPLETE = 'complete',
}

/**
 * Representa uma submissão de questionário no sistema.
 *
 * Esta interface define a estrutura principal de uma submissão no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * As submissões registram o progresso e conclusão de preenchimento de questionários.
 *
 * @property {number} questionnaireId - ID do questionário que está sendo respondido
 * @property {Date} startedAt - Data e hora em que o preenchimento foi iniciado
 * @property {Date} completedAt - Data e hora em que o preenchimento foi concluído (opcional)
 * @property {SubmissionStatus} status - Status atual da submissão (parcial ou completa)
 * @property {number} companyId - ID da empresa à qual esta submissão pertence (opcional)
 *
 * Relacionamentos:
 * @property {Company} company - Empresa à qual esta submissão está vinculada
 * @property {Questionnaire} questionnaire - Questionário ao qual esta submissão se refere
 * @property {Answer[]} answers - Respostas fornecidas nesta submissão
 * @property {Alert[]} alerts - Alertas gerados a partir das respostas desta submissão
 */
export interface Submission extends IEntity {
  // Propriedades principais
  questionnaireId: number;
  startedAt: Date;
  completedAt?: Date;
  status: SubmissionStatus;
  companyId?: number;

  // Relacionamentos
  company?: Company;
  questionnaire?: Questionnaire;
  answers?: Answer[];
  alerts?: Alert[];
}
