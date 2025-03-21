import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiCommonResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Dados de entrada inválidos',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          error: { type: 'string', example: 'Bad Request' },
          message: {
            type: 'array',
            items: { type: 'string' },
            example: ['campo é obrigatório'],
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Não autenticado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Acesso não autorizado' },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: 'Permissão negada',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 403 },
          message: { type: 'string', example: 'Permissão negada' },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: 'Erro interno do servidor' },
        },
      },
    }),
  );
}
