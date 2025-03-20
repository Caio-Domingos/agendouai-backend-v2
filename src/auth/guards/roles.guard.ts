import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Verifica se o usuário tem os papéis necessários para acessar a rota
   */
  canActivate(context: ExecutionContext): boolean {
    // Obtém os papéis necessários da rota (via decorator)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se não houver papéis definidos, permite o acesso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Obtém o usuário da requisição (adicionado pelo JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // Se não houver usuário, rejeita o acesso
    if (!user || !user.roles) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso',
      );
    }

    // Verifica se o usuário possui pelo menos um dos papéis necessários
    const hasRole = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        'Você não tem os papéis necessários para acessar este recurso',
      );
    }

    return true;
  }
}
