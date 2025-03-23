import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../response/api-response.class';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import { ValidationError } from 'class-validator';
import { ErrorLoggerService } from './error-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private errorLoggerService: ErrorLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = request.url;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let errorDetails: any = null;

    // Tratamento de exceções HttpException (e suas extensões)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        // Se o objeto de resposta tiver uma propriedade 'message'
        if ('message' in exceptionResponse) {
          if (Array.isArray(exceptionResponse['message'])) {
            message = exceptionResponse['message'].join(', ');
          } else {
            message = exceptionResponse['message'] as string;
          }
        }
        errorDetails = exceptionResponse;
      } else {
        message = exceptionResponse;
      }
    }
    // Tratamento de erros de validação class-validator
    else if (
      exception instanceof Array &&
      exception[0] instanceof ValidationError
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro de validação';
      errorDetails = this.formatValidationErrors(
        exception as ValidationError[],
      );
    }
    // Tratamento de erros de banco de dados
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro ao executar operação no banco de dados';

      // Identificar tipos específicos de erros do PostgreSQL
      const pgError = exception as any;
      if (pgError.code === '23505') {
        // Violação de chave única
        message = 'Já existe um registro com esse valor';
        if (pgError.detail) {
          message += `: ${pgError.detail}`;
        }
      } else if (pgError.code === '23503') {
        // Violação de chave estrangeira
        message =
          'Não é possível realizar esta operação devido a restrições de relacionamento';
      } else if (pgError.code === '23502') {
        // Violação de NOT NULL
        message = 'Valor obrigatório não informado';
      }
    }
    // Tratamento de entidade não encontrada
    else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = 'Recurso não encontrado';
    }
    // Outros erros
    else {
      this.logger.error('Erro não tratado:');
      this.logger.error(exception);

      if (exception instanceof Error) {
        message = exception.message;
        errorDetails = {
          name: exception.name,
          stack:
            process.env.NODE_ENV !== 'production' ? exception.stack : undefined,
        };
      }
    }

    // Registrar o erro para análise futura
    this.errorLoggerService.logError({
      timestamp: new Date(),
      path,
      statusCode: status,
      message,
      exception:
        exception instanceof Error
          ? exception
          : new Error(JSON.stringify(exception)),
      request: {
        method: request.method,
        url: request.url,
        ip: request.ip || '',
        headers: request.headers,
        user: (request as any).user,
      },
    });

    // Resposta padronizada para o cliente
    const errorResponse = ApiResponse.error(message, path);

    // Adicionar detalhes do erro em ambiente não produtivo
    if (process.env.NODE_ENV !== 'production' && errorDetails) {
      (errorResponse as any).details = errorDetails;
    }

    response.status(status).json(errorResponse);
  }

  /**
   * Formata erros de validação de uma forma mais legível
   */
  private formatValidationErrors(errors: ValidationError[]): any {
    return errors.reduce((acc, error) => {
      if (error.constraints) {
        acc[error.property] = Object.values(error.constraints);
      }

      if (error.children && error.children.length) {
        acc[error.property] = this.formatValidationErrors(error.children);
      }

      return acc;
    }, {});
  }
}
