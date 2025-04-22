import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { UserService } from 'src/modules/user/user.service';
import {
  User,
  UserRole,
  UserStatus,
} from 'src/database/schemas/user/user.model';
import { CompanyService } from 'src/modules/companies/companies.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UserService,
    private companyService: CompanyService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Valida um usuário pelas credenciais (usado pela estratégia local)
   */
  async validateUser(email: string, password: string): Promise<any> {
    this.logger.debug(`Tentativa de validação de usuário: ${email}`);
    try {
      // Busca o usuário pelo email, incluindo o campo de senha
      const user = await this.usersService.findByEmailWithPassword(email);

      if (!user) {
        this.logger.debug(`Usuário não encontrado: ${email}`);
        return null;
      }

      this.logger.debug(`Usuário encontrado: ${email}`);

      // Verifica se o usuário está ativo
      if (user.status !== UserStatus.ACTIVE) {
        this.logger.debug(`Usuário inativo: ${email}`);
        throw new UnauthorizedException('Usuário inativo');
      }

      // Compara a senha fornecida com o hash armazenado
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        this.logger.debug(`Senha inválida para usuário: ${email}`);
        return null;
      }

      this.logger.debug(`Usuário autenticado com sucesso: ${email}`);

      // Retorna o usuário sem a senha
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      this.logger.error(
        `Erro ao validar usuário: ${email}`,
        error.stack || error,
      );
      throw error;
    }
  }

  /**
   * Realiza o login do usuário e gera os tokens
   */
  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);

      if (!user) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      return this.generateTokens(user);
    } catch (error) {
      this.logger.error(
        `Erro no login para: ${loginDto.email}`,
        error.stack || error,
      );
      throw error;
    }
  }

  /**
   * Registra um novo usuário
   */
  async register(registerDto: RegisterDto, loggedUser?: any) {
    try {
      if (!loggedUser) {
        throw new UnauthorizedException('Usuário não autenticado');
      }

      // Validação de permissão por role
      const creatorRole = loggedUser.role;
      const targetRole = registerDto.role;
      // TODO: Checar se isso bate com o que está no banco
      const creatorCompanyId = loggedUser.companyId;
      const targetCompanyId = registerDto.companyId;

      if (creatorRole === UserRole.EMPLOYEE) {
        throw new UnauthorizedException('EMPLOYEE não pode criar usuários');
      }

      if (creatorRole === UserRole.UNIT) {
        if (targetRole === UserRole.ADMIN || targetRole === UserRole.COMPANY) {
          throw new UnauthorizedException(
            'UNIT só pode criar UNIT ou EMPLOYEE',
          );
        }
        if (targetCompanyId !== creatorCompanyId) {
          throw new UnauthorizedException(
            'UNIT só pode criar usuários na sua empresa',
          );
        }
      }

      if (creatorRole === UserRole.COMPANY) {
        if (targetRole === UserRole.ADMIN) {
          throw new UnauthorizedException('COMPANY não pode criar ADMIN');
        }
        if (targetCompanyId !== creatorCompanyId) {
          throw new UnauthorizedException(
            'COMPANY só pode criar usuários na sua empresa',
          );
        }
      }

      // ADMIN pode criar qualquer usuário
      return this._registerUser(registerDto);
    } catch (error) {
      this.logger.error(
        `Erro ao registrar usuário: ${registerDto.email}`,
        error.stack || error,
      );
      throw error;
    }
  }

  private async _registerUser(registerDto: RegisterDto) {
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
    });
    // Retorna os tokens de acesso
    return this.generateTokens(user);
  }

  /**
   * Gera tokens de acesso e refresh para um usuário
   */
  private generateTokens(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
      exp:
        Math.floor(Date.now() / 1000) +
        (this.configService.get<number>('auth.jwt.expirationTime') || 60),
      iat: Math.floor(Date.now() / 1000),
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
        name: user.name,
        role: user.role,
        companyId: user.companyId,
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
      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('Usuário inativo');
      }

      // Gera novos tokens
      return this.generateTokens(user);
    } catch (error) {
      this.logger.error(
        'Erro ao atualizar tokens via refreshToken',
        error.stack || error,
      );
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }
}
