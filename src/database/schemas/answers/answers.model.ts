import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { PageQuestion } from '../page-question/page-question.model';
import { Submission } from '../submissions/submissions.model';
import { Alert } from '../alerts/alerts.model';

/**
 * Representa uma resposta de usuário a uma questão em uma submissão.
 *
 * Esta interface define a estrutura principal de uma resposta no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * As respostas são os dados fornecidos pelos usuários ao preencher um questionário.
 *
 * @property {number} submissionId - ID da submissão à qual esta resposta pertence
 * @property {number} pageQuestionId - ID da questão da página que foi respondida
 * @property {object} value - Valor da resposta em formato JSON, podendo variar conforme o tipo da questão
 * @property {Alert[]} alerts - Alertas gerados a partir desta resposta
 */
export interface Answer extends IEntity {
  submissionId: number;
  pageQuestionId: number;
  value: Record<string, any>;

  submission?: Submission;
  pageQuestion?: PageQuestion;
  alerts?: Alert[];
}
