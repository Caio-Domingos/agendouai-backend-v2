import {
  DataSource,
  SelectQueryBuilder,
  Brackets,
  WhereExpressionBuilder,
} from 'typeorm';
import { Request } from 'express';
import { BaseRepository } from './base.repository';
import {
  QueryOptions,
  Filter,
  FilterOperator,
  Relation,
  PaginatedResult,
  isSimpleFilter,
  isFilterGroup,
  SimpleFilter,
  FilterGroup,
  LogicalOperator,
} from '../../crud/interfaces/crud.types';

/**
 * Repositório base que implementa operações de consulta avançadas
 * Estende o BaseRepository para aproveitar o gerenciamento de transações
 *
 * @template T - Tipo da entidade
 */
export abstract class BaseQueryRepository<
  T extends object,
> extends BaseRepository<T> {
  protected readonly entityClass: new () => T;
  protected readonly tableName: string;

  constructor(
    dataSource: DataSource,
    request: Request,
    entityClass: new () => T,
    tableName?: string,
  ) {
    super(dataSource, request);
    this.entityClass = entityClass;

    // Se o nome da tabela não for fornecido, usa o nome da classe em lowercase
    this.tableName = tableName || entityClass.name.toLowerCase();
  }

  /**
   * Aplica um filtro simples a um construtor de consulta
   */
  protected applySimpleFilter(
    builder: WhereExpressionBuilder,
    filter: SimpleFilter,
    paramPrefix: string,
  ): void {
    const { field, operator, value } = filter;
    const qualifiedField = field.includes('.')
      ? field
      : `${this.tableName}.${field}`;
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
  }

  /**
   * Aplica um grupo de filtros a um construtor de consulta
   */
  protected applyFilterGroup(
    builder: WhereExpressionBuilder,
    filterGroup: FilterGroup,
    paramPrefix: string,
  ): void {
    const { operator, filters } = filterGroup;

    if (!filters || filters.length === 0) {
      return;
    }

    // Se há apenas um filtro no grupo, aplicamos diretamente sem Brackets
    if (filters.length === 1) {
      if (isSimpleFilter(filters[0])) {
        this.applySimpleFilter(builder, filters[0], `${paramPrefix}_0`);
      } else if (isFilterGroup(filters[0])) {
        this.applyFilterGroup(builder, filters[0], `${paramPrefix}_g0`);
      }
      return;
    }

    // Para múltiplos filtros, agrupamos com parênteses usando Brackets
    builder.andWhere(
      new Brackets((qb) => {
        // Primeiro filtro - sempre usando andWhere para o primeiro
        const firstFilter = filters[0];
        if (isSimpleFilter(firstFilter)) {
          this.applySimpleFilter(qb, firstFilter, `${paramPrefix}_0`);
        } else if (isFilterGroup(firstFilter)) {
          this.applyFilterGroup(qb, firstFilter, `${paramPrefix}_g0`);
        }

        // Filtros subsequentes - usando andWhere ou orWhere conforme o operador
        for (let i = 1; i < filters.length; i++) {
          const filter = filters[i];
          const methodName =
            operator === LogicalOperator.AND ? 'andWhere' : 'orWhere';

          if (isSimpleFilter(filter)) {
            // Para filtros simples, aplicamos diretamente
            this.applySimpleFilterWithOperator(
              qb,
              filter,
              `${paramPrefix}_${i}`,
              methodName,
            );
          } else if (isFilterGroup(filter)) {
            // Para grupos aninhados, usamos outro Brackets
            qb[methodName](
              new Brackets((subQb) => {
                this.applyFilterGroup(subQb, filter, `${paramPrefix}_g${i}`);
              }),
            );
          }
        }
      }),
    );
  }

  /**
   * Aplica um filtro simples com o operador lógico especificado (AND/OR)
   * Esta função auxiliar resolve problemas de tipagem com o WhereExpressionBuilder
   */
  private applySimpleFilterWithOperator(
    builder: WhereExpressionBuilder,
    filter: SimpleFilter,
    paramPrefix: string,
    methodName: 'andWhere' | 'orWhere',
  ): void {
    const { field, operator, value } = filter;
    const qualifiedField = field.includes('.')
      ? field
      : `${this.tableName}.${field}`;
    const paramName = `${paramPrefix}_${field.replace(/\./g, '_')}`;

    // Definir a condição SQL e parâmetros
    let condition: string;
    const params: Record<string, any> = {};

    switch (operator) {
      case FilterOperator.EQUALS:
        if (value === null) {
          condition = `${qualifiedField} IS NULL`;
        } else {
          condition = `${qualifiedField} = :${paramName}`;
          params[paramName] = value;
        }
        break;
      case FilterOperator.NOT_EQUALS:
        if (value === null) {
          condition = `${qualifiedField} IS NOT NULL`;
        } else {
          condition = `${qualifiedField} != :${paramName}`;
          params[paramName] = value;
        }
        break;
      case FilterOperator.GREATER_THAN:
        condition = `${qualifiedField} > :${paramName}`;
        params[paramName] = value;
        break;
      case FilterOperator.LESS_THAN:
        condition = `${qualifiedField} < :${paramName}`;
        params[paramName] = value;
        break;
      case FilterOperator.GREATER_THAN_EQUALS:
        condition = `${qualifiedField} >= :${paramName}`;
        params[paramName] = value;
        break;
      case FilterOperator.LESS_THAN_EQUALS:
        condition = `${qualifiedField} <= :${paramName}`;
        params[paramName] = value;
        break;
      case FilterOperator.LIKE:
        condition = `${qualifiedField} ILIKE :${paramName}`;
        params[paramName] = `%${value}%`;
        break;
      case FilterOperator.IN:
        if (Array.isArray(value)) {
          condition = `${qualifiedField} IN (:...${paramName})`;
          params[paramName] = value;
        } else {
          condition = `${qualifiedField} = :${paramName}`;
          params[paramName] = value;
        }
        break;
      case FilterOperator.IS_NULL:
        condition = `${qualifiedField} IS NULL`;
        break;
      case FilterOperator.IS_NOT_NULL:
        condition = `${qualifiedField} IS NOT NULL`;
        break;
      default:
        return; // Operador inválido, ignora
    }

    // Aplicar a condição com o método correto (AND/OR)
    if (Object.keys(params).length > 0) {
      builder[methodName](condition, params);
    } else {
      builder[methodName](condition);
    }
  }

  /**
   * Aplica filtros a uma query builder
   */
  protected applyFilters(
    queryBuilder: SelectQueryBuilder<T>,
    filters: Filter[] = [],
  ): SelectQueryBuilder<T> {
    filters.forEach((filter, index) => {
      if (isSimpleFilter(filter)) {
        this.applySimpleFilter(queryBuilder, filter, `f${index}`);
      } else if (isFilterGroup(filter)) {
        this.applyFilterGroup(queryBuilder, filter, `fg${index}`);
      }
    });

    return queryBuilder;
  }

  /**
   * Aplica relações (joins) a uma query builder
   */
  protected applyRelations(
    queryBuilder: SelectQueryBuilder<T>,
    relations: Relation[] = [],
  ): SelectQueryBuilder<T> {
    relations.forEach((relation) => {
      const { path, alias } = relation;
      const fullPath = path.includes('.') ? path : `${this.tableName}.${path}`;
      queryBuilder.leftJoinAndSelect(fullPath, alias);
    });

    return queryBuilder;
  }

  /**
   * Encontra entidades com filtros, ordenação e paginação avançados
   */
  async findWithOptions(
    options: QueryOptions = {},
  ): Promise<PaginatedResult<T>> {
    const {
      pagination = { page: 1, size: 10 },
      order,
      filters,
      relations,
      select,
    } = options;

    // Criar query builder
    const queryBuilder = this.getRepository(
      this.entityClass,
    ).createQueryBuilder(this.tableName);

    // Aplicar seleção de campos
    if (select && select.length > 0) {
      queryBuilder.select(
        select.map((field) =>
          field.includes('.') ? field : `${this.tableName}.${field}`,
        ),
      );
    }

    // Aplicar relações
    if (relations && relations.length > 0) {
      this.applyRelations(queryBuilder, relations);
    }

    // Aplicar filtros
    if (filters && filters.length > 0) {
      this.applyFilters(queryBuilder, filters);
    }

    // Aplicar ordenação
    if (order) {
      const orderField = order.field.includes('.')
        ? order.field
        : `${this.tableName}.${order.field}`;
      queryBuilder.orderBy(orderField, order.direction);
    } else {
      queryBuilder.orderBy(`${this.tableName}.id`, 'ASC');
    }

    // Aplicar paginação
    const page = pagination.page;
    const size = pagination.size;
    const skip = (page - 1) * size;

    queryBuilder.skip(skip).take(size);

    // Executar consulta
    const [items, totalItems] = await queryBuilder.getManyAndCount();

    // Calcular metadados de paginação
    const totalPages = Math.ceil(totalItems / size);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
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
  }

  /**
   * Encontrar uma entidade com opções de relações e seleção
   */
  async findOneWithOptions(id: string, options: QueryOptions = {}): Promise<T> {
    const { relations, select } = options;

    const queryBuilder = this.getRepository(
      this.entityClass,
    ).createQueryBuilder(this.tableName);

    // Aplicar seleção de campos
    if (select && select.length > 0) {
      queryBuilder.select(
        select.map((field) =>
          field.includes('.') ? field : `${this.tableName}.${field}`,
        ),
      );
    }

    // Aplicar relações
    if (relations && relations.length > 0) {
      this.applyRelations(queryBuilder, relations);
    }

    // Filtrar por ID
    queryBuilder.where(`${this.tableName}.id = :id`, { id });

    // Executar consulta
    const entity = await queryBuilder.getOne();

    if (!entity) {
      throw new Error(`Entidade com ID ${id} não encontrada`);
    }

    return entity;
  }
}
