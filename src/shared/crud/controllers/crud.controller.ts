import {
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  Type,
  HttpCode,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { QueryController } from './query.controller';
import { CrudService } from '../services/crud.service';
import { Entity } from '../interfaces/crud.types';
import { Ctx } from 'src/auth/decorators/context.decorator';
import { ContextObject } from 'src/shared/context/context.dto';

export function CrudController<
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
  const QueryControllerClass = QueryController<T>(entityName, returnDto);

  class CrudControllerHost extends QueryControllerClass {
    constructor(
      private readonly crudService: CrudService<
        T,
        InstanceType<CreateDto>,
        InstanceType<UpdateDto>
      >,
    ) {
      super(crudService);
    }

    @Get()
    @ApiOperation({ summary: `Listar ${entityName}` })
    @ApiResponse({
      status: 200,
      description: `Lista de ${entityName}`,
      type: [returnDto],
    })
    async findAll(@Ctx() context?: ContextObject) {
      return this.crudService.findAll(context);
    }

    @Get(':id')
    @ApiOperation({ summary: `Buscar ${entityName} pelo ID` })
    @ApiParam({ name: 'id', type: Number, description: `ID do ${entityName}` })
    @ApiResponse({
      status: 200,
      description: `${entityName} encontrado`,
      type: returnDto,
    })
    @ApiResponse({ status: 404, description: `${entityName} não encontrado` })
    async findById(@Param('id') id: number, @Ctx() context?: ContextObject) {
      return this.crudService.findById(id, context);
    }

    @Post()
    @ApiOperation({ summary: `Criar novo ${entityName}` })
    @ApiBody({ type: createDto })
    @ApiResponse({
      status: 201,
      description: `${entityName} criado`,
      type: returnDto,
    })
    async create(
      @Body() dto: InstanceType<CreateDto>,
      @Ctx() context?: ContextObject,
    ) {
      return this.crudService.create(dto, context);
    }

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
      @Param('id') id: number,
      @Body() dto: InstanceType<UpdateDto>,
      @Ctx() context?: ContextObject,
    ) {
      return this.crudService.update(id, dto, context);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: `Remover ${entityName}` })
    @ApiParam({ name: 'id', type: Number, description: `ID do ${entityName}` })
    @ApiResponse({ status: 204, description: `${entityName} removido` })
    @ApiResponse({ status: 404, description: `${entityName} não encontrado` })
    async remove(@Param('id') id: number, @Ctx() context?: ContextObject) {
      await this.crudService.remove(id, context);
    }
  }

  return CrudControllerHost;
}
