import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Determina se a rota é pública e não requer autenticação
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Verifica se a rota está marcada como pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const authHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const hasToken = !!authHeader && authHeader.startsWith('Bearer ');

    if (isPublic) {
      // Se for pública e não tem token, deixa passar
      if (!hasToken) {
        return true;
      }
      // Se for pública e tem token, tenta validar, mas se falhar, permite acesso
      try {
        return super.canActivate(context);
      } catch {
        return true;
      }
    }

    // Caso contrário, verifica o JWT normalmente
    return super.canActivate(context);
  }

  /**
   * Personaliza a mensagem de erro quando a autenticação falha
   */
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new UnauthorizedException(
        'Acesso não autorizado. Token inválido ou expirado.',
      );
    }
    return user;
  }
}
