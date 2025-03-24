import { IEntity } from 'src/shared/database/interfaces/entity.interface';

/**
 * Representa uma página dentro de um questionário no sistema.
 *
 * Esta interface define a estrutura principal de uma página no banco de dados.
 * Ela estende a interface base IEntity que fornece propriedades comuns de entidade.
 * As páginas são componentes de um questionário e podem conter perguntas.
 *
 * @property {number} questionnaireId - ID do questionário ao qual esta página pertence
 * @property {string} title - Título da página
 * @property {number} sequenceNumber - Número de sequência que define a ordem da página no questionário
 * @property {boolean} isIdentificationPage - Indica se esta é uma página de identificação do respondente
 */
export interface Page extends IEntity {
  questionnaireId: number;
  title: string;
  sequenceNumber: number;
  isIdentificationPage: boolean;
}
