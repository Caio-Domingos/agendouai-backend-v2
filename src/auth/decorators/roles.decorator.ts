// Este arquivo foi simplificado e agora serve apenas para manter compatibilidade com código existente
// Para ser removido completamente em uma atualização futura

import { SetMetadata } from '@nestjs/common';

/**
 * @deprecated Este decorator não tem mais efeito e será removido em versões futuras.
 */
export const ROLES_KEY = 'roles';

/**
 * @deprecated Estes papéis não são mais usados e serão removidos em versões futuras.
 */
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

/**
 * @deprecated Este decorator não tem mais efeito e será removido em versões futuras.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
