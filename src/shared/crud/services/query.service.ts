import { NotFoundException } from '@nestjs/common';
import {
  Repository,
  SelectQueryBuilder,
  WhereExpressionBuilder,
  Brackets,
} from 'typeorm';
import {
  QueryOptions,
  PaginatedResult,
  Filter,
  FilterOperator,
  Entity,
  Relation,
  isSimpleFilter,
  isFilterGroup,
  LogicalOperator,
  SimpleFilter,
  FilterGroup,
} from '../interfaces/crud.types';

/**
 * Serviço base para consultas com filtros, ordenação e paginação
 * @class QueryService
 * @template T - Tipo da entidade que estende Entity
 */
export class QueryService<T extends Entity> {
  /**
   * @param {Repository<T>} repository - Repositório TypeORM da entidade
   */
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Aplica um filtro simples a um construtor de consulta
   *
   * @protected
   * @param {WhereExpressionBuilder} builder - Builder para aplicar o filtro
   * @param {SimpleFilter} filter - Filtro simples a ser aplicado
   * @param {string} alias - Alias da tabela principal
   * @param {string} paramPrefix - Prefixo para parâmetros nomeados (para evitar conflitos)
   * @returns {string} Nome do parâmetro usado
   */
  protected applySimpleFilter(
    builder: WhereExpressionBuilder,
    filter: SimpleFilter,
    alias: string,
    paramPrefix: string,
  ): string {
    const { field, operator, value } = filter;
    const qualifiedField = field.includes('.') ? field : `${alias}.${field}`;
    const paramName = `${paramPrefix}_${field.replace(/\./g, '_')}`;

    switch (operator) {
      case FilterOperator.EQUALS:
        if (value === null) {
          builder.andWhere(`${qualifiedField} IS NULL`);
        } else {
          builder.andWhere(`${qualifiedField} = :${paramName}`, {
            [paramName]: value,
          });
        }
        break;
      case FilterOperator.NOT_EQUALS:
        if (value === null) {
          builder.andWhere(`${qualifiedField} IS NOT NULL`);
        } else {
          builder.andWhere(`${qualifiedField} != :${paramName}`, {
            [paramName]: value,
          });
        }
        break;
      case FilterOperator.GREATER_THAN:
        builder.andWhere(`${qualifiedField} > :${paramName}`, {
          [paramName]: value,
        });
        break;
      case FilterOperator.LESS_THAN:
        builder.andWhere(`${qualifiedField} < :${paramName}`, {
          [paramName]: value,
        });
        break;
      case FilterOperator.GREATER_THAN_EQUALS:
        builder.andWhere(`${qualifiedField} >= :${paramName}`, {
          [paramName]: value,
        });
        break;
      case FilterOperator.LESS_THAN_EQUALS:
        builder.andWhere(`${qualifiedField} <= :${paramName}`, {
          [paramName]: value,
        });
        break;
      case FilterOperator.LIKE:
        builder.andWhere(`${qualifiedField} ILIKE :${paramName}`, {
          [paramName]: `%${value}%`,
        });
        break;
      case FilterOperator.IN:
        if (Array.isArray(value)) {
          builder.andWhere(`${qualifiedField} IN (:...${paramName})`, {
            [paramName]: value,
          });
        } else {
          builder.andWhere(`${qualifiedField} = :${paramName}`, {
            [paramName]: value,
          });
        }
        break;
      case FilterOperator.IS_NULL:
        builder.andWhere(`${qualifiedField} IS NULL`);
        break;
      case FilterOperator.IS_NOT_NULL:
        builder.andWhere(`${qualifiedField} IS NOT NULL`);
        break;
    }

    return paramName;
  }

  /**
   * Aplica um grupo de filtros a um construtor de consulta
   *
   * @protected
   * @param {WhereExpressionBuilder} builder - Builder para aplicar o filtro
   * @param {FilterGroup} filterGroup - Grupo de filtros a ser aplicado
   * @param {string} alias - Alias da tabela principal
   * @param {string} paramPrefix - Prefixo para parâmetros nomeados (para evitar conflitos)
   */
  protected applyFilterGroup(
    builder: WhereExpressionBuilder,
    filterGroup: FilterGroup,
    alias: string,
    paramPrefix: string,
  ): void {
    const { operator, filters } = filterGroup;

    // Se não há filtros no grupo, não faz nada
    if (!filters || filters.length === 0) {
      return;
    }

    // Se há apenas um filtro no grupo, aplicamos diretamente
    if (filters.length === 1) {
      this.applyFilterRecursively(
        builder,
        filters[0],
        alias,
        `${paramPrefix}_0`,
      );
      return;
    }

    // Para múltiplos filtros, agrupamos com parênteses usando Brackets
    builder.andWhere(
      new Brackets((qb) => {
        // Primeiro filtro
        const firstFilter = filters[0];
        if (isSimpleFilter(firstFilter)) {
          this.applySimpleFilter(qb, firstFilter, alias, `${paramPrefix}_0`);
        } else {
          this.applyFilterGroup(qb, firstFilter, alias, `${paramPrefix}_g0`);
        }

        // Filtros subsequentes
        for (let i = 1; i < filters.length; i++) {
          const filter = filters[i];
          const methodName =
            operator === LogicalOperator.AND ? 'andWhere' : 'orWhere';

          qb[methodName](
            new Brackets((subQb) => {
              if (isSimpleFilter(filter)) {
                this.applySimpleFilter(
                  subQb,
                  filter,
                  alias,
                  `${paramPrefix}_${i}`,
                );
              } else {
                this.applyFilterGroup(
                  subQb,
                  filter,
                  alias,
                  `${paramPrefix}_g${i}`,
                );
              }
            }),
          );
        }
      }),
    );
  }

  /**
   * Aplica um filtro (simples ou grupo) recursivamente
   *
   * @protected
   * @param {WhereExpressionBuilder} builder - Builder para aplicar o filtro
   * @param {Filter} filter - Filtro a ser aplicado
   * @param {string} alias - Alias da tabela principal
   * @param {string} paramPrefix - Prefixo para parâmetros nomeados (para evitar conflitos)
   */
  protected applyFilterRecursively(
    builder: WhereExpressionBuilder,
    filter: Filter,
    alias: string,
    paramPrefix: string,
  ): void {
    if (isSimpleFilter(filter)) {
      this.applySimpleFilter(builder, filter, alias, paramPrefix);
    } else if (isFilterGroup(filter)) {
      this.applyFilterGroup(builder, filter, alias, paramPrefix);
    }
  }

  /**
   * Aplica filtros a uma query builder
   *
   * @protected
   * @param {SelectQueryBuilder<T>} queryBuilder - Builder da consulta TypeORM
   * @param {Filter[]} filters - Lista de filtros a serem aplicados
   * @param {string} alias - Alias da tabela principal
   * @returns {SelectQueryBuilder<T>} QueryBuilder com os filtros aplicados
   */
  protected applyFilters(
    queryBuilder: SelectQueryBuilder<T>,
    filters: Filter[] = [],
    alias: string,
  ): SelectQueryBuilder<T> {
    filters.forEach((filter, index) => {
      this.applyFilterRecursively(queryBuilder, filter, alias, `f${index}`);
    });

    return queryBuilder;
  }

  /**
   * Aplica relações (joins) a uma query builder
   *
   * @protected
   * @param {SelectQueryBuilder<T>} queryBuilder - Builder da consulta TypeORM
   * @param {Relation[]} relations - Lista de relações a serem incluídas
   * @param {string} alias - Alias da tabela principal
   * @returns {SelectQueryBuilder<T>} QueryBuilder com as relações aplicadas
   */
  protected applyRelations(
    queryBuilder: SelectQueryBuilder<T>,
    relations: Relation[] = [],
    alias: string,
  ): SelectQueryBuilder<T> {
    relations.forEach((relation) => {
      const { path, alias: relationAlias } = relation;
      const fullPath = path.includes('.') ? path : `${alias}.${path}`;
      queryBuilder.leftJoinAndSelect(fullPath, relationAlias);
    });

    return queryBuilder;
  }

  /**
   * Hook executado antes de findOne
   * Pode ser sobrescrito para adicionar lógica personalizada
   *
   * @protected
   * @param {string | number} id - ID da entidade
   * @returns {Promise<void>}
   */
  protected async beforeFindOne(id: string | number): Promise<void> {
    // Hook para ser sobrescrito
  }

  /**
   * Hook executado após findOne
   * Pode ser sobrescrito para adicionar lógica personalizada
   *
   * @protected
   * @param {T} entity - Entidade encontrada
   * @returns {Promise<T>} Entidade possivelmente modificada
   */
  protected async afterFindOne(entity: T): Promise<T> {
    return entity;
  }

  /**
   * Hook executado antes de findAll
   * Pode ser sobrescrito para adicionar lógica personalizada
   *
   * @protected
   * @param {QueryOptions} options - Opções de consulta
   * @returns {Promise<QueryOptions>} Opções de consulta possivelmente modificadas
   */
  protected async beforeFindAll(options: QueryOptions): Promise<QueryOptions> {
    return options;
  }

  /**
   * Hook executado após findAll
   * Pode ser sobrescrito para adicionar lógica personalizada
   *
   * @protected
   * @param {PaginatedResult<T>} result - Resultado paginado
   * @returns {Promise<PaginatedResult<T>>} Resultado possivelmente modificado
   */
  protected async afterFindAll(
    result: PaginatedResult<T>,
  ): Promise<PaginatedResult<T>> {
    return result;
  }

  /**
   * Encontra uma entidade pelo ID
   *
   * @param {string | number} id - ID da entidade
   * @param {QueryOptions} [options={}] - Opções da consulta (relations, select)
   * @returns {Promise<T>} Entidade encontrada
   * @throws {NotFoundException} Se a entidade não for encontrada
   *
   * @example
   * // Buscar produto com ID 1, incluindo relação com criador
   * const product = await productService.findOne('1', {
   *   relations: [{ path: 'creator', alias: 'creator' }]
   * });
   */
  async findOne(id: string | number, options: QueryOptions = {}): Promise<T> {
    await this.beforeFindOne(id);

    const alias = this.repository.metadata.name.toLowerCase();
    const queryBuilder = this.repository.createQueryBuilder(alias);

    if (options.select) {
      queryBuilder.select(
        options.select.map((field) =>
          field.includes('.') ? field : `${alias}.${field}`,
        ),
      );
    }

    if (options.relations) {
      this.applyRelations(queryBuilder, options.relations, alias);
    }

    const idColumn = `${alias}.id`;
    queryBuilder.where(`${idColumn} = :id`, { id });

    const entity = await queryBuilder.getOne();

    if (!entity) {
      throw new NotFoundException(`Entidade com ID ${id} não encontrada`);
    }

    return await this.afterFindOne(entity);
  }

  /**
   * Encontra todas as entidades com paginação, filtros e ordenação
   *
   * @param {QueryOptions} [options={}] - Opções de consulta (paginação, filtros, ordenação, relações)
   * @returns {Promise<PaginatedResult<T>>} Resultado paginado
   *
   * @example
   * // Buscar produtos com várias opções
   * const result = await productService.findAll({
   *   // Paginação: página 1 com 10 itens
   *   pagination: { page: 1, size: 10 },
   *
   *   // Ordenação: preço decrescente
   *   order: { field: 'price', direction: 'DESC' },
   *
   *   // Filtros: apenas produtos ativos com estoque > 0
   *   filters: [
   *     { field: 'isActive', operator: 'eq', value: true },
   *     { field: 'stock', operator: 'gt', value: 0 }
   *   ],
   *
   *   // Incluir relação com criador
   *   relations: [{ path: 'creator', alias: 'creator' }],
   *
   *   // Selecionar apenas campos específicos
   *   select: ['id', 'name', 'price', 'stock']
   * });
   *
   * // Filtros complexos com AND/OR aninhados
   * const result = await productService.findAll({
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
   * });
   * // Esta consulta busca produtos que: são da categoria 'electronics' OU (custam menos de 100 E têm estoque)
   *
   * // Resultado:
   * // {
   * //   items: [...], // Lista de produtos
   * //   meta: {
   * //     page: 1,
   * //     size: 10,
   * //     totalItems: 45,
   * //     totalPages: 5,
   * //     hasNextPage: true,
   * //     hasPreviousPage: false
   * //   }
   * // }
   */
  async findAll(options: QueryOptions = {}): Promise<PaginatedResult<T>> {
    const processedOptions = await this.beforeFindAll(options);

    const {
      pagination = { page: 1, size: 10 },
      order,
      filters,
      relations,
      select,
    } = processedOptions;

    const alias = this.repository.metadata.name.toLowerCase();
    const queryBuilder = this.repository.createQueryBuilder(alias);

    // Aplicar seleção de campos
    if (select) {
      queryBuilder.select(
        select.map((field) =>
          field.includes('.') ? field : `${alias}.${field}`,
        ),
      );
    }

    // Aplicar relações
    if (relations) {
      this.applyRelations(queryBuilder, relations, alias);
    }

    // Aplicar filtros
    if (filters) {
      this.applyFilters(queryBuilder, filters, alias);
    }

    // Aplicar ordenação
    if (order) {
      const orderField = order.field.includes('.')
        ? order.field
        : `${alias}.${order.field}`;
      queryBuilder.orderBy(orderField, order.direction);
    } else {
      queryBuilder.orderBy(`${alias}.id`, 'ASC');
    }

    // Calcular a paginação
    const page = pagination.page;
    const size = pagination.size;
    const skip = (page - 1) * size;

    queryBuilder.skip(skip).take(size);

    // Executar a consulta com contagem
    const [items, totalItems] = await queryBuilder.getManyAndCount();

    // Calcular metadados de paginação
    const totalPages = Math.ceil(totalItems / size);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const result: PaginatedResult<T> = {
      items,
      meta: {
        page,
        size,
        totalItems,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };

    return await this.afterFindAll(result);
  }
}
