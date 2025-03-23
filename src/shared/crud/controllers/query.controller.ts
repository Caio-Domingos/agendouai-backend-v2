import {
  Get,
  Param,
  Query,
  Type,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { QueryService } from '../services/query.service';
import { QueryOptions, Entity } from '../interfaces/crud.types';
import { QueryOptionsPipe } from '../pipes/query-options.pipe';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

/**
 * Cria uma classe de controller com métodos de consulta (findAll, findOne)
 *
 * @template T - Tipo da entidade que estende Entity
 * @param {string} entityName - Nome da entidade (para mensagens e documentação)
 * @param {Type<any>} returnDto - Classe DTO para serialização da resposta
 * @returns {Type<any>} Classe do controller
 */
export function QueryController<T extends Entity>(
  entityName: string,
  returnDto: Type<any>,
): Type<any> {
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiExtraModels(PaginatedResponseDto, returnDto)
  class QueryControllerHost {
    /**
     * @param {QueryService<T>} service - Serviço para operações de consulta
     */
    constructor(private readonly service: QueryService<T>) {}

    /**
     * Busca todos os registros com suporte para paginação, filtros, ordenação e relações
     *
     * @param {QueryOptions} options - Opções de consulta transformadas pelo QueryOptionsPipe
     * @returns {Promise<PaginatedResult<T>>} Resultado paginado
     *
     * @example
     * // Exemplos de requisições HTTP:
     *
     * // Paginação básica
     * // GET /produtos?page=1&size=10
     *
     * // Ordenação
     * // GET /produtos?orderBy=price:DESC
     *
     * // Filtros
     * // GET /produtos?filters=[{"field":"price","operator":"gt","value":100},{"field":"isActive","operator":"eq","value":true}]
     *
     * // Incluir relações
     * // GET /produtos?relations=creator,category
     *
     * // Selecionar campos específicos
     * // GET /produtos?select=id,name,price
     *
     * // Combinação de parâmetros
     * // GET /produtos?page=1&size=10&orderBy=price:DESC&filters=[{"field":"stock","operator":"gt","value":0}]&relations=creator
     */
    @Get()
    @ApiOperation({ summary: `Obter todos ${entityName}` })
    @ApiResponse({
      status: 200,
      description: `Lista de ${entityName} paginada`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(returnDto) },
              },
            },
          },
        ],
      },
    })
    @ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Número da página (começando em 1)',
    })
    @ApiQuery({
      name: 'size',
      required: false,
      type: Number,
      description: 'Tamanho da página (máximo 100)',
    })
    @ApiQuery({
      name: 'orderBy',
      required: false,
      type: String,
      description: 'Campo e direção para ordenação (ex: name:ASC, price:DESC)',
    })
    @ApiQuery({
      name: 'filters',
      required: false,
      type: String,
      description:
        'Filtros em formato JSON. Suporta filtros simples e complexos com operadores AND/OR. Ex: [{"field":"price","operator":"gt","value":100}] ou [{"operator":"or","filters":[{"field":"category","operator":"eq","value":"electronics"},{"operator":"and","filters":[{"field":"price","operator":"lt","value":100},{"field":"stock","operator":"gt","value":0}]}]}]',
      schema: {
        type: 'string',
        example:
          '[{"operator":"or","filters":[{"field":"category","operator":"eq","value":"electronics"},{"operator":"and","filters":[{"field":"price","operator":"lt","value":100},{"field":"stock","operator":"gt","value":0}]}]}]',
      },
    })
    @ApiQuery({
      name: 'relations',
      required: false,
      type: String,
      description:
        'Relações a serem incluídas, separadas por vírgula (ex: creator,category)',
    })
    @ApiQuery({
      name: 'select',
      required: false,
      type: String,
      description:
        'Campos a serem selecionados, separados por vírgula (ex: id,name,price)',
    })
    async findAll(@Query(QueryOptionsPipe) options: QueryOptions) {
      return this.service.findAll(options);
    }

    /**
     * Busca um registro pelo ID
     *
     * @param {number} id - ID do registro a ser encontrado
     * @param {QueryOptions} options - Opções de consulta (para relations e select)
     * @returns {Promise<T>} Registro encontrado
     *
     * @example
     * // Buscar um produto pelo ID
     * // GET /produtos/123
     *
     * // Buscar um produto incluindo relações
     * // GET /produtos/123?relations=creator,category
     *
     * // Buscar um produto selecionando campos específicos
     * // GET /produtos/123?select=id,name,price
     */
    @Get(':id')
    @ApiOperation({ summary: `Obter ${entityName} por ID` })
    @ApiResponse({
      status: 200,
      description: `${entityName} encontrado`,
      type: returnDto,
    })
    @ApiResponse({ status: 404, description: `${entityName} não encontrado` })
    @ApiParam({ name: 'id', type: Number, description: `ID do ${entityName}` })
    @ApiQuery({
      name: 'relations',
      required: false,
      type: String,
      description: 'Relações a serem incluídas (ex: creator,category)',
    })
    @ApiQuery({
      name: 'select',
      required: false,
      type: String,
      description: 'Campos a serem selecionados (ex: id,name,price)',
    })
    async findOne(
      @Param('id', ParseIntPipe) id: number,
      @Query(QueryOptionsPipe) options: QueryOptions,
    ) {
      return this.service.findOne(id, options);
    }
  }

  return QueryControllerHost;
}
