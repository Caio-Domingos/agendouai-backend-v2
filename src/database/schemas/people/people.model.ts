import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Representa uma pessoa vinculada a uma empresa.
 *
 * @property {string} cpf - CPF ou CNPJ da pessoa.
 * @property {string} phoneNumber - Número de telefone.
 * @property {string} cep - CEP.
 * @property {number} createdBy - ID do usuário que criou o registro.
 * @property {number} updatedBy - ID do usuário que atualizou o registro.
 * @property {number} companyId - ID da empresa vinculada.
 * @property {string} photoUrl - URL da foto da pessoa.
 * @property {string} name - Nome da pessoa.
 * @property {string} role - Função/cargo da pessoa.
 * @property {string} city - Cidade.
 * @property {string} state - Estado.
 * @property {string} country - País.
 * @property {string} address - Endereço.
 * @property {string} addressNumber - Número do endereço.
 * @property {Date} birthDate - Data de nascimento.
 */
export interface Person extends IEntity {
  cpf?: string;
  phoneNumber: string;
  cep?: string;
  createdBy: number;
  updatedBy: number;
  companyId: number;
  photoUrl?: string;
  name?: string;
  role?: string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
  addressNumber?: string;
  birthDate?: Date;
}
