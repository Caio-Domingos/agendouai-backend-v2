import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {
  QueryOptions,
  OrderDirection,
  FilterOperator,
  Filter,
  LogicalOperator,
  SimpleFilter,
  FilterGroup,
  isSimpleFilter,
  isFilterGroup,
} from '../interfaces/crud.types';

/**
 * Pipe para transformar parâmetros da URL em um objeto QueryOptions estruturado
 *
 * @class QueryOptionsPipe
 * @implements {PipeTransform}
 *
 * @example
 * // Uso no controller:
 * @Get()
 * findAll(@Query(QueryOptionsPipe) options: QueryOptions) {
 *   return this.service.findAll(options);
 * }
 *
 * // Chamada da API:
 * // GET /products?page=1&size=10&orderBy=price:DESC&filters=[{"field":"stock","operator":"gt","value":0}]&relations=creator
 *
 * // Chamada com filtros complexos:
 * // GET /products?filters=[{"operator":"or","filters":[{"field":"category","operator":"eq","value":"electronics"},{"operator":"and","filters":[{"field":"price","operator":"lt","value":100},{"field":"stock","operator":"gt","value":0}]}]}]
 */
@Injectable()
export class QueryOptionsPipe implements PipeTransform {
  /**
   * Valida um filtro (simples ou grupo)
   *
   * @private
   * @param {any} filter - Filtro a ser validado
   * @returns {boolean} Se o filtro é válido
   */
  private isValidFilter(filter: any): boolean {
    // Verificar se é um filtro simples
    if (
      filter &&
      typeof filter.field === 'string' &&
      Object.values(FilterOperator).includes(filter.operator) &&
      'value' in filter
    ) {
      return true;
    }

    // Verificar se é um grupo de filtros
    if (
      filter &&
      Object.values(LogicalOperator).includes(filter.operator) &&
      Array.isArray(filter.filters)
    ) {
      // Verificar recursivamente cada filtro no grupo
      return filter.filters.every((subFilter: any) =>
        this.isValidFilter(subFilter),
      );
    }

    return false;
  }

  /**
   * Transforma os parâmetros da requisição em um objeto QueryOptions
   *
   * @param {any} value - Os parâmetros da requisição
   * @returns {QueryOptions} Objeto QueryOptions estruturado
   *
   * @throws {BadRequestException} Se os parâmetros estiverem em formato inválido
   *
   * @example
   * // Parâmetros da requisição:
   * // ?page=1&size=10&orderBy=price:DESC&filters=[{"field":"stock","operator":"gt","value":0}]&relations=creator,submission:submissionref,submission.questionnaire:questionnaireref,answer:answerref
   *
   * // Retorna:
   * // {
   * //   pagination: { page: 1, size: 10 },
   * //   order: { field: 'price', direction: 'DESC' },
   * //   filters: [{ field: 'stock', operator: 'gt', value: 0 }],
   * //   relations: [{ path: 'creator', alias: 'creator' }]
   * // }
   *
   * // Parâmetros com filtro complexo:
   * // ?filters=[{"operator":"or","filters":[{"field":"category","operator":"eq","value":"electronics"},{"operator":"and","filters":[{"field":"price","operator":"lt","value":100},{"field":"stock","operator":"gt","value":0}]}]}]
   *
   * // Retorna:
   * // {
   * //   filters: [
   * //     {
   * //       operator: 'or',
   * //       filters: [
   * //         { field: 'category', operator: 'eq', value: 'electronics' },
   * //         {
   * //           operator: 'and',
   * //           filters: [
   * //             { field: 'price', operator: 'lt', value: 100 },
   * //             { field: 'stock', operator: 'gt', value: 0 }
   * //           ]
   * //         }
   * //       ]
   * //     }
   * //   ]
   * // }
   */
  transform(value: any): QueryOptions {
    try {
      const queryOptions: QueryOptions = {};

      // Processar paginação
      if (value.page || value.size) {
        const page = parseInt(value.page, 10) || 1;
        const size = parseInt(value.size, 10) || 10;

        // Limitar o tamanho da página para prevenir problemas de performance
        const safeSize = size > 100 ? 100 : size;

        queryOptions.pagination = {
          page: page > 0 ? page : 1,
          size: safeSize > 0 ? safeSize : 10,
        };
      }

      // Processar ordenação
      if (value.orderBy) {
        const [field, direction] = value.orderBy.split(':');
        queryOptions.order = {
          field,
          direction: Object.values(OrderDirection).includes(
            direction?.toUpperCase() as OrderDirection,
          )
            ? (direction.toUpperCase() as OrderDirection)
            : OrderDirection.ASC,
        };
      }

      // Processar filtros
      if (value.filters) {
        try {
          let parsedFilters: Filter[];

          if (typeof value.filters === 'string') {
            parsedFilters = JSON.parse(value.filters);
          } else {
            parsedFilters = value.filters;
          }

          // Validar cada filtro
          if (Array.isArray(parsedFilters)) {
            queryOptions.filters = parsedFilters.filter((filter) =>
              this.isValidFilter(filter),
            );
          }
        } catch (e) {
          throw new BadRequestException('Formato de filtros inválido');
        }
      }

      // Processar relacionamentos
      if (value.relations) {
        if (typeof value.relations === 'string') {
          queryOptions.relations = value.relations.split(',').map((rel) => {
            const [path, alias] = rel.split(':');
            return {
              path,
              alias: alias || path.split('.').pop() || path,
            };
          });
        } else if (Array.isArray(value.relations)) {
          queryOptions.relations = value.relations;
        }
      }

      // Processar campos selecionados
      if (value.select) {
        if (typeof value.select === 'string') {
          queryOptions.select = value.select.split(',');
        } else if (Array.isArray(value.select)) {
          queryOptions.select = value.select;
        }
      }

      return queryOptions;
    } catch (error) {
      throw new BadRequestException(
        'Erro ao processar os parâmetros de consulta.',
      );
    }
  }
}
