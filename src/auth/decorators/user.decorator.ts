import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../strategies/jwt.strategy';

/**
 * Decorador que extrai o usuário autenticado do request
 *
 * @example
 * // Extrair o usuário completo
 * @Get('profile')
 * getProfile(@User() user: any) {
 *   return user;
 * }
 *
 * @example
 * // Extrair uma propriedade específica do usuário
 * @Get('email')
 * getUserEmail(@User('email') email: string) {
 *   return { email };
 * }
 */
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    // Retorna a propriedade específica se data for fornecido
    // Caso contrário, retorna o objeto user completo
    return data ? user?.[data] : user;
  },
);
