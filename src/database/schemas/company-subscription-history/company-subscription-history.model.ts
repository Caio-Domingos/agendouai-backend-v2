import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Status de pagamento da assinatura da empresa.
 */
export enum CompanySubscriptionPaymentStatus {
  ATIVO = 'ativo',
  CANCELADO = 'cancelado',
  PENDENTE = 'pendente',
  FALHA = 'falha',
  TRIAL = 'trial',
  EXPIRADO = 'expirado',
}

/**
 * Representa o histórico de assinaturas de planos de uma empresa.
 *
 * @property {number} companyId - ID da empresa.
 * @property {number} planId - ID do plano.
 * @property {CompanySubscriptionPaymentStatus} paymentStatus - Status do pagamento.
 * @property {Date} startedAt - Data de início da assinatura.
 * @property {Date} endedAt - Data de término da assinatura.
 * @property {number} amountPaid - Valor pago.
 * @property {string} stripeSubscriptionId - ID da assinatura no Stripe.
 * @property {string} stripePaymentIntentId - ID do pagamento no Stripe.
 * @property {object} metadata - Metadados adicionais (JSON).
 * @property {Date} createdAt - Data de criação do registro.
 */
export interface CompanySubscriptionHistory extends IEntity {
  companyId: number;
  planId: number;
  paymentStatus: CompanySubscriptionPaymentStatus;
  startedAt: Date;
  endedAt?: Date;
  amountPaid?: number;
  stripeSubscriptionId?: string;
  stripePaymentIntentId?: string;
  metadata?: object;
  createdAt: Date;
}
