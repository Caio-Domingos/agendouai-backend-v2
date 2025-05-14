import { IEntity } from 'src/shared/database/interfaces/entity.interface';
import { CompanySubscriptionHistory } from '../company-subscription-history/company-subscription-history.model';

/**
 * Representa um plano de assinatura do sistema.
 *
 * @property {string} name - Nome do plano.
 * @property {string} description - Descrição detalhada do plano.
 * @property {number} price - Preço do plano.
 * @property {string} interval - Intervalo de cobrança (ex: mensal, anual).
 * @property {object} features - Funcionalidades inclusas no plano (JSON).
 * @property {boolean} active - Indica se o plano está ativo.
 * @property {string} stripePlanId - ID do plano no Stripe.
 * @property {Date} createdAt - Data de criação do plano.
 * @property {Date} updatedAt - Data da última atualização do plano.
 */
export interface Plan extends IEntity {
  // Not null
  name: string;
  price: number;
  interval: string;

  // Nullable
  description?: string;
  features?: object;
  active?: boolean;
  stripePlanId?: string;
  createdAt: Date;
  updatedAt: Date;

  // FK
  // (none)

  // Relationships
  subscriptionHistory?: CompanySubscriptionHistory[];
}
