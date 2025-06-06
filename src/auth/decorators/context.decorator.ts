import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextObject } from 'src/shared/context/context.dto';
import { JwtPayload } from '../strategies/jwt.strategy'; // Adjust path as needed

/**
 * Decorador que cria um ContextObject a partir do request.
 *
 * @example
 * @Post()
 * async create(@Body() dto: CreateDto, @Ctx() context: ContextObject) {
 *   return this.service.create(dto, context);
 * }
 */
export const Ctx = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ContextObject => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtPayload = request.user;
    const token = request.headers?.authorization?.split(' ')?.[1]; // Bearer <token>

    return {
      user,
      request, // Provide the full request for now, but encourage minimal usage in services
      token,
    };
  },
);
