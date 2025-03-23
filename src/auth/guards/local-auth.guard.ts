import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // Este guard usa a estratégia local para autenticação
  // É utilizado principalmente no endpoint de login
}
