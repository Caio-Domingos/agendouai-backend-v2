import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../schemas/user/user.entity';
import { UserStatus } from '../schemas/user/user.model';

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

    // Verificar quantos usuários já existem
    const existingUserCount = await this.userRepository.count();
    this.logger.log(`Usuários existentes: ${existingUserCount}`);

    // Se já temos 10 ou mais usuários, não precisamos criar mais
    if (existingUserCount >= 10) {
      this.logger.log(
        'Já existem pelo menos 10 usuários. Seed não necessário.',
      );
      return { success: true };
    }

    // Quantos usuários precisamos criar
    const usersToCreate = 10 - existingUserCount;
    this.logger.log(`Criando ${usersToCreate} novos usuários...`);

    // Senha padrão para todos os usuários
    const saltRounds = this.configService.get<number>(
      'auth.security.bcryptSaltRounds',
      10,
    );
    const hashedPassword = await bcrypt.hash('Caio1234', saltRounds);

    // Listas para gerar nomes aleatórios
    const firstNames = [
      'Ana',
      'Carlos',
      'Maria',
      'João',
      'Pedro',
      'Lucas',
      'Mariana',
      'Paulo',
      'Lúcia',
      'Fernando',
      'Julia',
      'Rafael',
      'Fernanda',
      'Roberto',
      'Camila',
    ];
    const lastNames = [
      'Silva',
      'Santos',
      'Oliveira',
      'Souza',
      'Pereira',
      'Costa',
      'Rodrigues',
      'Almeida',
      'Nascimento',
      'Lima',
      'Araújo',
      'Fernandes',
      'Carvalho',
      'Gomes',
      'Martins',
    ];

    // Criar usuários aleatórios
    for (let i = 0; i < usersToCreate; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;

      // Criar email único baseado no nome (adicionando timestamp para evitar duplicatas)
      const timestamp = Date.now() + i; // Adicionando i para garantir unicidade mesmo em criações rápidas
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${timestamp}@example.com`;

      await this.userRepository.save({
        name,
        email,
        password: hashedPassword,
        status: UserStatus.ACTIVE,
      });

      this.logger.log(`Usuário criado: ${name} (${email})`);
    }

    this.logger.log(`${usersToCreate} usuários criados com sucesso.`);
    return { success: true };
  }
}
