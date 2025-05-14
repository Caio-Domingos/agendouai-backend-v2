import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeepPartial } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../schemas/users/users.entity';
import { PeopleEntity } from '../schemas/people/people.entity';
import { CompaniesEntity } from '../schemas/companies/companies.entity';
import { UserStatus, UserPermission } from '../schemas/users/users.model';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
    // Adicione outros repositórios conforme necessário
  ) {}

  /**
   * Executa todas as seeds
   */
  async runAllSeeds() {
    this.logger.log('Executando todas as seeds...');

    // Truncate tables to ensure clean seed
    await this.truncateTables();

    // Seed inicial do sistema: cria admin
    await this.seedInitialAdmin();

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
   * Seed inicial: cria um usuário admin com pessoa completa
   */
  async seedInitialAdmin() {
    this.logger.log('Criando usuário admin inicial...');

    // Dados do admin
    const adminEmail = 'admin@agendouai.com';
    const adminPassword = 'Senha@123';
    const saltRounds = this.configService.get<number>(
      'auth.security.bcryptSaltRounds',
      10,
    );

    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
    const peoplePartial: DeepPartial<PeopleEntity> = {
      cpf: '12345678901',
      phoneNumber: '+5511999999999',
      cep: '01001-000',
      photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'Administrador do Sistema',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      address: 'Rua Exemplo',
      addressNumber: '100',
      birthDate: new Date('1990-01-01'),
    };

    // Cria pessoa
    const person = await this.peopleRepository.save(peoplePartial);

    // Cria usuário admin
    const user: DeepPartial<UserEntity> = {
      username: adminEmail,
      password: hashedPassword,
      permission: UserPermission.ADMIN,
      status: UserStatus.ACTIVE,
      personId: person.id,
    };
    await this.userRepository.save(user);

    this.logger.log('Usuário admin criado com sucesso!');
  }
}
