import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export function ApiEndpoint<T extends Type<any>>(options: {
  summary: string;
  description?: string;
  responseType?: T;
  status?: number;
  isArray?: boolean;
}) {
  const {
    summary,
    description,
    responseType,
    status = 200,
    isArray = false,
  } = options;

  // Base decorators, always applied
  const decorators = [ApiOperation({ summary, description })];

  // If we have a response type, register it and add the schema
  if (responseType) {
    // Explicitly register the model - this is crucial
    decorators.push(ApiExtraModels(responseType));

    decorators.push(
      ApiResponse({
        status,
        schema: {
          properties: {
            success: { type: 'boolean', example: true },
            message: {
              type: 'string',
              example: 'Operação realizada com sucesso',
            },
            data: isArray
              ? {
                  type: 'array',
                  items: { $ref: getSchemaPath(responseType) },
                }
              : { $ref: getSchemaPath(responseType) },
          },
        },
      }),
    );
  } else {
    // Default response if no type is provided
    decorators.push(
      ApiResponse({
        status,
        schema: {
          properties: {
            success: { type: 'boolean', example: true },
            message: {
              type: 'string',
              example: 'Operação realizada com sucesso',
            },
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
