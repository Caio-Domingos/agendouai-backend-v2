import { SetMetadata } from '@nestjs/common';

/**
 * Chave para marcar os papéis necessários para acessar uma rota
 */
export const ROLES_KEY = 'roles';

/**
 * Enum de papéis disponíveis no sistema
 */
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

/**
 * Decorator que especifica quais papéis podem acessar uma rota
 * Exemplo de uso: @Roles(Role.ADMIN)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
