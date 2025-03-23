import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * @deprecated Este guard não tem mais efeito e será removido em versões futuras.
 * Todos os pedidos são automaticamente autorizados.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Verifica se o usuário tem os papéis necessários para acessar a rota
   */
  canActivate(context: ExecutionContext): boolean {
    // Agora sempre retorna true - o sistema de roles foi desabilitado
    return true;
  }
}
