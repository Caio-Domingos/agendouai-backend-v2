import { IEntity } from 'src/shared/database/interfaces/entity.interface';
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
 */
export interface Submission extends IEntity {
  questionnaireId: number;
  startedAt: Date;
  completedAt?: Date;
  status: SubmissionStatus;

  questionnaire?: Questionnaire;
}
