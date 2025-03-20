import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // Configurando passport-local para usar email em vez de username
      usernameField: 'email',
    });
  }

  /**
   * Método chamado quando a autenticação é solicitada
   * Valida as credenciais e retorna o usuário
   */
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user;
  }
}
