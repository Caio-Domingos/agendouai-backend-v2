import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from '../shared/swagger/response-decorators';
import { ApiCommonResponses } from '../shared/swagger/error-responses.decorator';
import {
  AuthResponseDto,
  RefreshTokenDto,
  UserResponseDto,
} from './dto/response.dto';

@ApiTags('_Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint de login - valida credenciais e retorna tokens
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiEndpoint({
    summary: 'Autenticar usuário e obter tokens',
    responseType: AuthResponseDto,
  })
  @ApiCommonResponses()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Endpoint de registro - cria um novo usuário e retorna tokens
   */
  @Public()
  @Post('register')
  @ApiEndpoint({
    summary: 'Registrar novo usuário',
    responseType: AuthResponseDto,
    status: 201,
  })
  @ApiCommonResponses()
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Endpoint para atualizar tokens usando um refresh token
   */
  @Public()
  @Post('refresh')
  @ApiEndpoint({
    summary: 'Obter novos tokens usando refresh token',
    responseType: AuthResponseDto,
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiCommonResponses()
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  /**
   * Endpoint protegido - exige autenticação
   */
  @Get('profile')
  @ApiBearerAuth('JWT')
  @ApiEndpoint({
    summary: 'Obter perfil do usuário autenticado',
    responseType: UserResponseDto,
  })
  @ApiCommonResponses()
  getProfile(@Request() req) {
    return req.user;
  }
}
