import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Representa uma empresa cadastrada no sistema.
 *
 * @property {string} cpfCnpj - CPF ou CNPJ da empresa.
 * @property {string} cep - CEP da empresa.
 * @property {number} categoryId - ID da categoria da empresa.
 * @property {number} createdBy - ID do usuário que criou a empresa.
 * @property {number} updatedBy - ID do usuário que atualizou a empresa.
 * @property {string} logoUrl - URL do logo da empresa.
 * @property {number} provider - Provedor da empresa (inteiro).
 * @property {CompanyStatus} status - Status da empresa.
 * @property {number} currentPlanId - ID do plano atual.
 * @property {PaymentStatus} currentPaymentStatus - Status de pagamento atual.
 * @property {string} stripeCustomerId - ID do cliente Stripe.
 * @property {string} name - Nome da empresa.
 * @property {string} phone - Telefone da empresa.
 * @property {string} city - Cidade.
 * @property {string} state - Estado.
 * @property {string} country - País.
 * @property {string} address - Endereço.
 * @property {string} addressNumber - Número do endereço.
 * @property {object} defaultAvailability - Disponibilidade padrão (JSON).
 */
export enum CompanyStatus {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
  PENDENTE = 'pendente',
  CANCELADO = 'cancelado',
  CONCLUIDO = 'concluido',
}

export enum PaymentStatus {
  ATIVO = 'ativo',
  CANCELADO = 'cancelado',
  PENDENTE = 'pendente',
  FALHA = 'falha',
  TRIAL = 'trial',
  EXPIRADO = 'expirado',
}

export interface Company extends IEntity {
  cpfCnpj: string;
  cep?: string;
  categoryId?: number;
  createdBy: number;
  updatedBy: number;
  logoUrl?: string;
  provider?: number;
  status: CompanyStatus;
  currentPlanId?: number;
  currentPaymentStatus?: PaymentStatus;
  stripeCustomerId?: string;
  name?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
  addressNumber?: string;
  defaultAvailability?: object;
}
