import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Interface para o payload do JWT
 */
export interface JwtPayload {
  sub: number;
  email: string;
  name?: string;
  role?: string;
  companyId?: number;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extrai o token do cabeçalho Authorization (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Ignora expiração no servidor e permite que o JWT faça isso
      ignoreExpiration: false,

      // Chave secreta para verificar a assinatura
      secretOrKey: configService.get<string>('auth.jwt.secret')!,
    });
  }

  /**
   * Método chamado quando o token é válido
   * Retorna o objeto do usuário que será anexado à requisição (req.user)
   */
  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      companyId: payload.companyId,
    };
  }
}
