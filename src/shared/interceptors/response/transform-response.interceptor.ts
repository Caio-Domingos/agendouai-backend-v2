import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from './api-response.class';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.url;

    return next.handle().pipe(
      map((data) => {
        // Se a resposta já é uma instância de ApiResponse, retorna diretamente
        if (data instanceof ApiResponse) {
          return data;
        }

        // Caso especial para PaginatedResult
        if (data && data.items && data.meta) {
          return ApiResponse.success(data, 'Dados obtidos com sucesso', path);
        }

        // Para respostas vazias ou undefined (como em 204 No Content)
        if (data === undefined || data === null) {
          return ApiResponse.success(data, 'Operação concluída', path);
        }

        // Para outros tipos de dados
        return ApiResponse.success(
          data,
          'Operação realizada com sucesso',
          path,
        );
      }),
    );
  }
}
