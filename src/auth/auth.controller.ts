import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { Roles, Role } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint de login - valida credenciais e retorna tokens
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Endpoint de registro - cria um novo usuário e retorna tokens
   */
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Endpoint para atualizar tokens usando um refresh token
   */
  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  /**
   * Endpoint protegido - exige autenticação
   */
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /**
   * Endpoint que exige papel específico
   */
  @Roles(Role.ADMIN)
  @Get('admin')
  getAdminData() {
    return {
      message: 'Dados confidenciais acessíveis apenas para administradores',
    };
  }
}
