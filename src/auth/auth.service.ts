import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Valida um usuário pelas credenciais (usado pela estratégia local)
   */
  async validateUser(email: string, password: string): Promise<any> {
    // Busca o usuário pelo email, incluindo o campo de senha
    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    // Verifica se o usuário está ativo
    if (!user.isActive) {
      return null;
    }

    // Compara a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    // Retorna o usuário sem a senha
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Realiza o login do usuário e gera os tokens
   */
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return this.generateTokens(user);
  }

  /**
   * Registra um novo usuário
   */
  async register(registerDto: RegisterDto) {
    // Verifica se o email já está em uso
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new BadRequestException('Este email já está em uso');
    }

    // Gera o hash da senha
    const saltRounds = this.configService.get<number>(
      'auth.security.bcryptSaltRounds',
    );
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds!);

    // Cria o novo usuário
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      roles: ['user'], // Papel padrão para novos usuários
    });

    // Retorna os tokens de acesso
    return this.generateTokens(user);
  }

  /**
   * Gera tokens de acesso e refresh para um usuário
   */
  private generateTokens(user: any) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    // Gera o token de acesso
    const accessToken = this.jwtService.sign(payload);

    // Gera o token de refresh com uma expiração mais longa
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<number>('auth.jwt.refreshExpirationTime')}s`,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<number>('auth.jwt.expirationTime'),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      },
    };
  }

  /**
   * Atualiza os tokens usando um refresh token
   */
  async refreshTokens(refreshToken: string) {
    try {
      // Verifica se o refresh token é válido
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('auth.jwt.secret'),
      });

      // Busca o usuário pelo id
      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      // Verifica se o usuário está ativo
      if (!user.isActive) {
        throw new UnauthorizedException('Usuário inativo');
      }

      // Gera novos tokens
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }
}
