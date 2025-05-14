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

import { UsersService } from 'src/modules/users/users.service';
import { CompaniesService } from 'src/modules/companies/companies.service';
import {
  User,
  UserPermission,
  UserStatus,
} from 'src/database/schemas/users/users.model';
import { PeopleService } from 'src/modules/people/people.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private peopleService: PeopleService,
    private companyService: CompaniesService,
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
      // Validação de permissão por role

      if (loggedUser) {
        const creatorRole = loggedUser.role;
        const targetRole = registerDto.permission;

        const creatorCompanyId = loggedUser.companyId;
        const targetCompanyId = registerDto.companyId;
        if (
          creatorRole === UserPermission.EMPLOYEE ||
          creatorRole === UserPermission.USER
        ) {
          throw new UnauthorizedException(
            'EMPLOYEE ou USER não pode criar usuários',
          );
        }

        if (creatorRole === UserPermission.MANAGER) {
          if (targetRole === UserPermission.ADMIN) {
            throw new UnauthorizedException('COMPANY não pode criar ADMIN');
          }
          if (targetCompanyId !== creatorCompanyId) {
            throw new UnauthorizedException(
              'COMPANY só pode criar usuários na sua empresa',
            );
          }
        }
      } else {
        registerDto.permission = UserPermission.USER;
      }

      // ADMIN pode criar qualquer usuário
      return this._registerUser(registerDto, loggedUser);
    } catch (error) {
      this.logger.error(
        `Erro ao registrar usuário: ${registerDto.email}`,
        error.stack || error,
      );
      throw error;
    }
  }

  private async _registerUser(registerDto: RegisterDto, loggedUser?: any) {
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

    // Separa dados de pessoa e usuário
    const {
      email,
      permission,
      status,
      companyId,
      // pessoa:
      name,
      cpf,
      phoneNumber,
      cep,
      photoUrl,
      city,
      state,
      country,
      address,
      addressNumber,
      birthDate,
    } = registerDto;

    // Cria a pessoa primeiro
    const person = await this.peopleService.create({
      name,
      cpf,
      phoneNumber,
      cep,
      photoUrl,
      city,
      state,
      country,
      address,
      addressNumber,
      birthDate,
      companyId: companyId ?? undefined,
      createdBy: loggedUser?.id ?? null,
      updatedBy: loggedUser?.id ?? null,
    });

    // Cria o usuário associado à pessoa
    const user = await this.usersService.create({
      username: email,
      password: hashedPassword,
      permission: permission ?? undefined,
      status: status ?? undefined,
      companyId,
      personId: person.id,
      createdBy: loggedUser?.id ?? null,
      updatedBy: loggedUser?.id ?? null,
    });

    // Retorna os tokens de acesso
    return this.generateTokens({
      ...user,
      people: person,
    });
  }

  /**
   * Gera tokens de acesso e refresh para um usuário
   */
  private generateTokens(user: User & { person?: any }) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.username,
      name: user.people?.name,
      role: user.permission,
      companyId: user.companyId,
      // unitId: user.unitId, // adicione se necessário
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
        email: user.username,
        name: user.people?.name,
        role: user.permission,
        companyId: user.companyId,
        person: user.people,
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
