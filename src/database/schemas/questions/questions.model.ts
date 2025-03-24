import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Enum que define os tipos possíveis de questões no sistema.
 */
export enum QuestionType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  FILE = 'FILE',
  CHOICE = 'CHOICE',
}

/**
 * Representa uma entidade de questão no sistema.
 *
 * Esta interface define a estrutura principal de uma questão no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * As questões são componentes fundamentais dos questionários no sistema NPS.
 *
 * @property {string} slug - Identificador único da questão em formato amigável para URL
 * @property {string} title - Título da questão
 * @property {string} description - Descrição detalhada da questão (opcional)
 * @property {QuestionType} type - Tipo da questão que define como será respondida
 * @property {object} configuration - Configurações específicas da questão em formato JSON
 */
export interface Question extends IEntity {
  slug: string;
  title: string;
  description?: string;
  type: QuestionType;
  configuration: Record<string, any>;
}
