/**
 * Direção de ordenação possível para consultas
 * @enum {string}
 */
export enum OrderDirection {
  /** Ordenação ascendente (A-Z, 0-9) */
  ASC = 'ASC',
  /** Ordenação descendente (Z-A, 9-0) */
  DESC = 'DESC',
}

/**
 * Operadores de filtro disponíveis para consultas
 * @enum {string}
 */
export enum FilterOperator {
  /** Igualdade (=) */
  EQUALS = 'eq',
  /** Diferente (!=) */
  NOT_EQUALS = 'ne',
  /** Maior que (>) */
  GREATER_THAN = 'gt',
  /** Menor que (<) */
  LESS_THAN = 'lt',
  /** Maior ou igual a (>=) */
  GREATER_THAN_EQUALS = 'gte',
  /** Menor ou igual a (<=) */
  LESS_THAN_EQUALS = 'lte',
  /** Contém texto (LIKE %valor%) */
  LIKE = 'like',
  /** Está na lista de valores (IN) */
  IN = 'in',
  /** Campo é nulo (IS NULL) */
  IS_NULL = 'isNull',
  /** Campo não é nulo (IS NOT NULL) */
  IS_NOT_NULL = 'isNotNull',
}

/**
 * Operador lógico para combinar filtros
 * @enum {string}
 */
export enum LogicalOperator {
  /** Operador AND - todas as condições devem ser verdadeiras */
  AND = 'and',
  /** Operador OR - pelo menos uma condição deve ser verdadeira */
  OR = 'or',
}

/**
 * Filtro para consultas - condição simples
 * @interface Filter
 * @example
 * // Filtro para produtos com stock maior que 10
 * const filter = { field: 'stock', operator: 'gt', value: 10 };
 *
 * // Filtro para produtos ativos
 * const filter = { field: 'isActive', operator: 'eq', value: true };
 */
export interface SimpleFilter {
  /** Nome do campo na entidade */
  field: string;
  /** Operador de comparação */
  operator: FilterOperator;
  /** Valor para comparação */
  value: any;
}

/**
 * Grupo de filtros combinados com um operador lógico
 * @interface FilterGroup
 * @example
 * // (stock > 10 AND price < 100) OR isActive = true
 * const filterGroup = {
 *   operator: 'or',
 *   filters: [
 *     {
 *       operator: 'and',
 *       filters: [
 *         { field: 'stock', operator: 'gt', value: 10 },
 *         { field: 'price', operator: 'lt', value: 100 }
 *       ]
 *     },
 *     { field: 'isActive', operator: 'eq', value: true }
 *   ]
 * };
 */
export interface FilterGroup {
  /** Operador lógico para combinar os filtros (AND/OR) */
  operator: LogicalOperator;
  /** Lista de filtros ou grupos de filtros */
  filters: Array<SimpleFilter | FilterGroup>;
}

/** Tipo de filtro (simples ou grupo) */
export type Filter = SimpleFilter | FilterGroup;

/**
 * Verificar se um filtro é um SimpleFilter
 */
export function isSimpleFilter(filter: Filter): filter is SimpleFilter {
  return 'field' in filter && 'operator' in filter && 'value' in filter;
}

/**
 * Verificar se um filtro é um FilterGroup
 */
export function isFilterGroup(filter: Filter): filter is FilterGroup {
  return 'operator' in filter && 'filters' in filter;
}

/**
 * Definição de ordenação
 * @interface Order
 * @example
 * // Ordenar por preço em ordem descendente
 * const order = { field: 'price', direction: OrderDirection.DESC };
 */
export interface Order {
  /** Nome do campo na entidade */
  field: string;
  /** Direção de ordenação (ASC ou DESC) */
  direction: OrderDirection;
}

/**
 * Configuração de paginação
 * @interface Pagination
 * @example
 * // Obter a segunda página com 15 itens por página
 * const pagination = { page: 2, size: 15 };
 */
export interface Pagination {
  /** Número da página (começa em 1) */
  page: number;
  /** Quantidade de itens por página */
  size: number;
}

/**
 * Configuração de relacionamento
 * @interface Relation
 * @example
 * // Incluir o relacionamento com o criador
 * const relation = { path: 'creator', alias: 'creator' };
 *
 * // Incluir um relacionamento aninhado
 * const relation = { path: 'category.parent', alias: 'parentCategory' };
 */
export interface Relation {
  /** Caminho do relacionamento (pode incluir aninhamento com ".") */
  path: string;
  /** Alias para o relacionamento na consulta */
  alias: string;
}

/**
 * Opções completas para consulta
 * @interface QueryOptions
 * @example
 * // Exemplo completo com todos os parâmetros
 * const options = {
 *   pagination: { page: 1, size: 10 },
 *   order: { field: 'createdAt', direction: 'DESC' },
 *   filters: [
 *     { field: 'price', operator: 'gte', value: 100 },
 *     { field: 'isActive', operator: 'eq', value: true }
 *   ],
 *   relations: [{ path: 'creator', alias: 'creator' }],
 *   select: ['id', 'name', 'price']
 * };
 *
 * // Exemplo com filtros complexos
 * const options = {
 *   filters: [
 *     {
 *       operator: 'or',
 *       filters: [
 *         { field: 'category', operator: 'eq', value: 'electronics' },
 *         {
 *           operator: 'and',
 *           filters: [
 *             { field: 'price', operator: 'lt', value: 100 },
 *             { field: 'stock', operator: 'gt', value: 0 }
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * };
 */
export interface QueryOptions {
  /** Configuração de paginação */
  pagination?: Pagination;
  /** Configuração de ordenação */
  order?: Order;
  /** Lista de filtros a serem aplicados */
  filters?: Filter[];
  /** Lista de relacionamentos a serem incluídos */
  relations?: Relation[];
  /** Lista de campos a serem selecionados */
  select?: string[];
}

/**
 * Resultado paginado
 * @interface PaginatedResult
 * @template T - Tipo da entidade retornada
 */
export interface PaginatedResult<T> {
  /** Lista de itens na página atual */
  items: T[];
  /** Metadados da paginação */
  meta: {
    /** Número da página atual */
    page: number;
    /** Tamanho da página */
    size: number;
    /** Total de itens em todas as páginas */
    totalItems: number;
    /** Total de páginas */
    totalPages: number;
    /** Indica se há uma próxima página */
    hasNextPage: boolean;
    /** Indica se há uma página anterior */
    hasPreviousPage: boolean;
  };
}

/**
 * Interface para entidades base
 * @interface Entity
 */
export interface Entity {
  /** ID único da entidade */
  id: string | number;
}
