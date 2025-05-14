import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}

  /**
   * Executa todas as seeds
   */
  async runAllSeeds() {
    this.logger.log('Executando todas as seeds...');

    // Truncate tables to ensure clean seed
    await this.truncateTables();

    // Execute seed with user creation only
    await this.seedUsers();

    this.logger.log('Seeds executadas com sucesso.');
    return { success: true };
  }

  /**
   * Truncate all tables to ensure clean seed
   */
  async truncateTables() {
    this.logger.log('Truncando tabelas...');
    const schema = this.configService.get<string>('database.schema', 'public');

    await this.dataSource.transaction(async (manager) => {
      await manager.query('SET session_replication_role = replica;');
      await manager.query(
        `TRUNCATE TABLE "${schema}"."users" RESTART IDENTITY CASCADE;`,
      );
      await manager.query('SET session_replication_role = DEFAULT;');
    });

    this.logger.log('Tabelas truncadas com sucesso.');
  }

  /**
   * Seed only users
   */
  async seedUsers() {
    // this.logger.log('Criando usuários seed...');
    // const saltRounds = this.configService.get<number>(
    //   'auth.security.bcryptSaltRounds',
    //   10,
    // );
    // const hashedPassword = await bcrypt.hash('Senha@123', saltRounds);
    // await this.userRepository.save({
    //   name: 'Usuário Administrador',
    //   email: 'admin@exemplo.com',
    //   password: hashedPassword,
    //   status: UserStatus.ACTIVE,
    //   role: UserRole.ADMIN,
    // });
    // this.logger.log('Usuário ADMIN criado.');
  }
}
