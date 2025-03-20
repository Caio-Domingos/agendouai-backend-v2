import { SetMetadata } from '@nestjs/common';

/**
 * Chave para marcar rotas como públicas
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator que marca uma rota como pública (não requer autenticação)
 * Exemplo de uso: @Public()
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
