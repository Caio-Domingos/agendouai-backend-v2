import { IEntity } from 'src/shared/database/interfaces/entity.interface';

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

/**
 * Representa uma entidade de empresa no sistema.
 *
 * Esta interface define a estrutura principal de um registro de empresa no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * As empresas são organizações cadastradas no sistema NPS para avaliação e feedback.
 *
 * @property {string} name - Nome oficial da empresa
 * @property {string} cnpj - CNPJ único da empresa, usado para identificação
 * @property {string} tradingName - Nome fantasia da empresa (opcional)
 * @property {string} phone - Telefone de contato da empresa (opcional)
 * @property {CompanyStatus} status - Status atual da empresa no sistema
 */
export interface Company extends IEntity {
  name: string;
  cnpj: string;
  tradingName?: string;
  phone?: string;
  status: CompanyStatus;
}
