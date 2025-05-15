import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeepPartial } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../schemas/users/users.entity';
import { PeopleEntity } from '../schemas/people/people.entity';
import { CompaniesEntity } from '../schemas/companies/companies.entity';
import { PlansEntity } from '../schemas/plans/plans.entity';
import { CompanyCategoriesEntity } from '../schemas/company-categories/company-categories.entity';
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
    @InjectRepository(PlansEntity)
    private plansRepository: Repository<PlansEntity>,
    @InjectRepository(CompanyCategoriesEntity)
    private companyCategoriesRepository: Repository<CompanyCategoriesEntity>,
    // Adicione outros repositórios conforme necessário
  ) {}

  /**
   * Executa todas as seeds
   */
  async runAllSeeds() {
    this.logger.log('Executando todas as seeds...');

    // Truncate tables to ensure clean seed
    // await this.truncateTables();

    // Seed de plans e categories default
    await this.seedDefaultPlansAndCategories();

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
   * Seed de plans e categories default
   */
  async seedDefaultPlansAndCategories() {
    this.logger.log('Verificando plans e categories default...');
    // Plans defaults
    const defaultPlans = [
      {
        name: 'Free',
        price: 0,
        interval: 'mensal',
        description: 'Plano gratuito',
        active: true,
      },
      {
        name: 'Basic',
        price: 49.9,
        interval: 'mensal',
        description: 'Plano básico',
        active: true,
      },
      {
        name: 'Pro',
        price: 99.9,
        interval: 'mensal',
        description: 'Plano profissional',
        active: true,
      },
      {
        name: 'Enterprise',
        price: 199.9,
        interval: 'mensal',
        description: 'Plano empresarial',
        active: true,
      },
    ];
    for (const plan of defaultPlans) {
      const exists = await this.plansRepository.findOne({
        where: { name: plan.name },
      });
      if (!exists) {
        await this.plansRepository.save(plan);
        this.logger.log(`Plano '${plan.name}' criado.`);
      }
    }
    // Categories defaults
    const defaultCategories = [
      { description: 'Coworking' },
      { description: 'Escritório Virtual' },
      { description: 'Consultório' },
      { description: 'Salão de Beleza' },
      { description: 'Estúdio' },
      { description: 'Clínica' },
      { description: 'Outro' },
    ];
    for (const cat of defaultCategories) {
      const exists = await this.companyCategoriesRepository.findOne({
        where: { description: cat.description },
      });
      if (!exists) {
        await this.companyCategoriesRepository.save(cat);
        this.logger.log(`Categoria '${cat.description}' criada.`);
      }
    }
    this.logger.log('Plans e categories default verificados/criados.');
  }

  /**
   * Seed inicial: cria um usuário admin com pessoa completa
   */
  async seedInitialAdmin() {
    this.logger.log('Criando usuário admin inicial...');

    // Dados do admin
    const adminEmail = 'admin@agendouai.com';
    const adminPassword = 'Senha@123';

    // Verifica se já existe admin
    const existingAdmin = await this.userRepository.findOne({
      where: { username: adminEmail },
    });
    if (existingAdmin) {
      this.logger.log('Usuário admin já existe, não será criado novamente.');
      return;
    }

    const saltRounds = this.configService.get<number>(
      'auth.security.bcryptSaltRounds',
      10,
    );
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Cria usuário admin
    const userPartial: DeepPartial<UserEntity> = {
      username: adminEmail,
      password: hashedPassword,
      permission: UserPermission.ADMIN,
      status: UserStatus.ACTIVE,
    };
    const user = await this.userRepository.save(userPartial);

    const peoplePartial: DeepPartial<PeopleEntity> = {
      userId: user.id,
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
    await this.peopleRepository.save(peoplePartial);

    this.logger.log('Usuário admin criado com sucesso!');
  }
}
