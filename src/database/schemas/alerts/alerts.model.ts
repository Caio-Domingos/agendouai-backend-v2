import { IEntity } from 'src/shared/database/interfaces/entity.interface';

import { Answer } from '../answers/answers.model';
import { Company } from '../companies/companies.model';
import { Submission } from '../submissions/submissions.model';

/**
 * Enum que define os status possíveis de um alerta no sistema.
 */
export enum AlertStatus {
  NEW = 'new',
  VIEWED = 'viewed',
  RESOLVED = 'resolved',
}

/**
 * Representa um alerta gerado a partir de uma resposta em uma submissão.
 *
 * Esta interface define a estrutura principal de um alerta no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * Os alertas são notificações geradas quando uma resposta atende a determinados critérios
 * configurados nas perguntas, permitindo a identificação de situações que requerem atenção.
 *
 * @property {number} submissionId - ID da submissão à qual este alerta está vinculado
 * @property {number} answerId - ID da resposta que gerou o alerta
 * @property {Record<string, any>} alertConfig - Configuração do alerta em formato JSON
 * @property {AlertStatus} status - Status atual do alerta (novo, visualizado ou resolvido)
 * @property {number} companyId - ID da empresa à qual este alerta pertence (opcional)
 *
 * Relacionamentos:
 * @property {Company} company - Empresa à qual este alerta está vinculado
 * @property {Submission} submission - Submissão que originou este alerta
 * @property {Answer} answer - Resposta específica que gerou este alerta
 */
export interface Alert extends IEntity {
  // Propriedades principais
  submissionId: number;
  answerId: number;
  alertConfig: Record<string, any>;
  status: AlertStatus;
  companyId?: number;

  // Relacionamentos
  company?: Company;
  submission?: Submission;
  answer?: Answer;
}
