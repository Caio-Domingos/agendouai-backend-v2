import { SetMetadata } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

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

// Esta função ajuda a expor o enum Role para o Swagger
export function getEnumValues(enumType: any): string[] {
  return Object.keys(enumType)
    .filter(key => isNaN(Number(key)))
    .map(key => enumType[key]);
}

/**
 * Decorator que especifica quais papéis podem acessar uma rota
 * Exemplo de uso: @Roles(Role.ADMIN)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
