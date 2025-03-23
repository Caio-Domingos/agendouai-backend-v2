import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../schemas/user/user.entity';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  /**
   * Executa todas as seeds
   */
  async runAllSeeds() {
    this.logger.log('Executando todas as seeds...');

    // Executa seeds na ordem correta
    await this.seedUsers();

    this.logger.log('Seeds executadas com sucesso.');
    return { success: true };
  }

  /**
   * Seed para criar usuários iniciais
   */
  async seedUsers() {
    this.logger.log('Iniciando seed de usuários...');

    // Verifica se já existe um usuário admin
    const adminExists = await this.userRepository.findOneBy({
      email: 'admin@example.com',
    });

    if (!adminExists) {
      this.logger.log('Criando usuário admin...');

      const saltRounds = this.configService.get<number>(
        'auth.security.bcryptSaltRounds',
      );
      const hashedPassword = await bcrypt.hash('Admin123456', saltRounds || 10);

      await this.userRepository.save({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: hashedPassword,
        isActive: true,
      });

      this.logger.log('Usuário admin criado com sucesso.');
    } else {
      this.logger.log('Usuário admin já existe, pulando...');
    }

    // Verifica se já existe um usuário normal
    const userExists = await this.userRepository.findOneBy({
      email: 'user@example.com',
    });

    if (!userExists) {
      this.logger.log('Criando usuário comum...');

      const saltRounds = this.configService.get<number>(
        'auth.security.bcryptSaltRounds',
      );
      const hashedPassword = await bcrypt.hash('User123456', saltRounds || 10);

      await this.userRepository.save({
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@example.com',
        password: hashedPassword,
        isActive: true,
      });

      this.logger.log('Usuário comum criado com sucesso.');
    } else {
      this.logger.log('Usuário comum já existe, pulando...');
    }

    return { success: true };
  }
}
