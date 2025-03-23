import {
  Get,
  Param,
  Query,
  ParseIntPipe,
  Type,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  Entity,
  PaginatedResult,
  QueryOptions,
} from '../interfaces/crud.types';
import { CrudController } from './crud.controller';
import { CrudQueryService } from '../services/crud-query.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

/**
 * Cria um controlador que combina funcionalidades CRUD e de consulta avançada
 * É a implementação recomendada para a maioria das entidades
 *
 * @template T - Tipo da entidade
 * @template CreateDto - Tipo do DTO para criação
 * @template UpdateDto - Tipo do DTO para atualização
 * @template ReturnDto - Tipo do DTO para retorno
 */
export function CrudQueryController<
  T extends Entity,
  CreateDto extends Type<any>,
  UpdateDto extends Type<any>,
  ReturnDto extends Type<any>,
>(
  entityName: string,
  createDto: CreateDto,
  updateDto: UpdateDto,
  returnDto: ReturnDto,
): Type<any> {
  // Não reutilizamos a classe base CrudController para evitar duplicação de rotas
  // Em vez disso, definimos todas as rotas aqui de uma só vez

  class CrudQueryControllerHost {
    constructor(
      protected readonly crudQueryService: CrudQueryService<
        T,
        InstanceType<CreateDto>,
        InstanceType<UpdateDto>
      >,
    ) {}

    /**
     * Busca entidades com opções avançadas de consulta (paginação, filtros, relações, etc)
     */
    @Get('query')
    @ApiOperation({ summary: `Consulta avançada de ${entityName}` })
    @ApiQuery({
      name: 'filters',
      required: false,
      type: String,
      description: 'Filtros em formato JSON',
    })
    async findWithOptions(
      @Query() options: QueryOptions = {},
    ): Promise<PaginatedResult<T>> {
      return this.crudQueryService.findWithOptions(options);
    }

    /**
     * Busca uma entidade por ID com opções de relações e seleção
     */
    @Get(':id/query')
    @ApiOperation({ summary: `Consulta avançada de ${entityName} por ID` })
    @ApiParam({ name: 'id', type: Number, description: `ID do ${entityName}` })
    @ApiQuery({
      name: 'relations',
      required: false,
      type: String,
      description: 'Relações a serem incluídas',
    })
    async findOneWithOptions(
      @Param('id', ParseIntPipe) id: number,
      @Query() options: QueryOptions = {},
    ): Promise<T> {
      return this.crudQueryService.findOneWithOptions(id, options);
    }

    /**
     * Lista todas as entidades
     */
    @Get()
    @ApiOperation({ summary: `Listar ${entityName}` })
    @ApiResponse({
      status: 200,
      description: `Lista de ${entityName}`,
      type: [returnDto],
    })
    async findAll(): Promise<T[]> {
      return this.crudQueryService.findAll();
    }

    /**
     * Busca uma entidade por ID
     */
    @Get(':id')
    @ApiOperation({ summary: `Buscar ${entityName} pelo ID` })
    @ApiParam({ name: 'id', type: Number, description: `ID do ${entityName}` })
    @ApiResponse({
      status: 200,
      description: `${entityName} encontrado`,
      type: returnDto,
    })
    @ApiResponse({ status: 404, description: `${entityName} não encontrado` })
    async findById(
      @Param('id', ParseIntPipe) id: number,
      @Query() options: QueryOptions = {},
    ): Promise<T> {
      return this.crudQueryService.findById(id, options);
    }

    /**
     * Cria uma nova entidade
     */
    @Post()
    @ApiOperation({ summary: `Criar novo ${entityName}` })
    @ApiBody({ type: createDto })
    @ApiResponse({
      status: 201,
      description: `${entityName} criado`,
      type: returnDto,
    })
    async create(@Body() dto: InstanceType<CreateDto>) {
      return this.crudQueryService.create(dto);
    }

    /**
     * Atualiza uma entidade existente
     */
    @Put(':id')
    @ApiOperation({ summary: `Atualizar ${entityName}` })
    @ApiParam({ name: 'id', type: Number, description: `ID do ${entityName}` })
    @ApiBody({ type: updateDto })
    @ApiResponse({
      status: 200,
      description: `${entityName} atualizado`,
      type: returnDto,
    })
    @ApiResponse({ status: 404, description: `${entityName} não encontrado` })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: InstanceType<UpdateDto>,
    ) {
      return this.crudQueryService.update(id, dto);
    }

    /**
     * Remove uma entidade
     */
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: `Remover ${entityName}` })
    @ApiParam({ name: 'id', type: Number, description: `ID do ${entityName}` })
    @ApiResponse({ status: 204, description: `${entityName} removido` })
    @ApiResponse({ status: 404, description: `${entityName} não encontrado` })
    async remove(@Param('id', ParseIntPipe) id: number) {
      await this.crudQueryService.remove(id);
    }
  }

  return CrudQueryControllerHost;
}
