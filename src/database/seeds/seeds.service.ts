import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../schemas/user/user.entity';
import { UserStatus } from '../schemas/user/user.model';
import { QuestionEntity } from '../schemas/questions/questions.entity';
import { QuestionType } from '../schemas/questions/questions.model';
import { QuestionnaireEntity } from '../schemas/questionnaires/questionnaires.entity';
import { QuestionnaireStatus } from '../schemas/questionnaires/questionnaires.model';
import { PageEntity } from '../schemas/pages/pages.entity';
import { PageQuestionEntity } from '../schemas/page-question/page-question.entity';
import { CreateQuestionDTO } from '../schemas/questions/questions.dto';
import { CreateQuestionnaireDTO } from '../schemas/questionnaires/questionnaires.dto';
import { CreatePageDTO } from '../schemas/pages/pages.dto';
import { CreatePageQuestionDTO } from '../schemas/page-question/page-question.dto';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    @InjectRepository(QuestionnaireEntity)
    private questionnaireRepository: Repository<QuestionnaireEntity>,
    @InjectRepository(PageEntity)
    private pageRepository: Repository<PageEntity>,
    @InjectRepository(PageQuestionEntity)
    private pageQuestionRepository: Repository<PageQuestionEntity>,
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

    // Execute seed with related entities
    await this.seedCompleteStructure();

    this.logger.log('Seeds executadas com sucesso.');
    return { success: true };
  }

  /**
   * Truncate all tables to ensure clean seed
   */
  async truncateTables() {
    this.logger.log('Truncando tabelas...');

    // Using transaction to ensure all truncates are performed
    await this.dataSource.transaction(async (manager) => {
      // Order matters due to foreign key constraints
      await manager.query('TRUNCATE TABLE submissions CASCADE');
      await manager.query('TRUNCATE TABLE answers CASCADE');
      await manager.query('TRUNCATE TABLE page_questions CASCADE');
      await manager.query('TRUNCATE TABLE pages CASCADE');
      await manager.query('TRUNCATE TABLE questionnaires CASCADE');
      await manager.query('TRUNCATE TABLE questions CASCADE');
      await manager.query('TRUNCATE TABLE users CASCADE');
    });

    this.logger.log('Tabelas truncadas com sucesso.');
  }

  /**
   * Seed complete structure: user -> questionnaire -> page -> question -> page_question
   */
  async seedCompleteStructure() {
    this.logger.log('Iniciando seed da estrutura completa...');

    // 1. Create user
    const saltRounds = this.configService.get<number>(
      'auth.security.bcryptSaltRounds',
      10,
    );
    const hashedPassword = await bcrypt.hash('Admin@123', saltRounds);

    const userData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
    };
    const user = await this.userRepository.save(userData);
    this.logger.log(`Usuário criado: ${user.name} (${user.email})`);

    // 2. Create question - following the CreateQuestionDTO
    const questionData: CreateQuestionDTO = {
      slug: 'satisfaction-level',
      title: 'How satisfied are you with our service?',
      description: 'Rate your satisfaction from 1 to 10',
      type: QuestionType.TEXT,
      configuration: {
        min: 1,
        max: 10,
        minLabel: 'Not satisfied',
        maxLabel: 'Very satisfied',
      },
    };
    const question = await this.questionRepository.save(questionData);
    this.logger.log(`Questão criada: ${question.title}`);

    // 3. Create questionnaire - following the CreateQuestionnaireDTO
    const questionnaireData: CreateQuestionnaireDTO = {
      title: 'Customer Satisfaction Survey',
      description:
        'Please help us improve our services by answering this short survey',
      status: QuestionnaireStatus.PUBLISHED,
    };
    // We need to add the createdBy field manually as it's not in the DTO but required by the entity
    const questionnaire = await this.questionnaireRepository.save({
      ...questionnaireData,
      createdBy: user.id,
    });
    this.logger.log(`Questionário criado: ${questionnaire.title}`);

    // 4. Create page - following the CreatePageDTO
    const pageData: CreatePageDTO = {
      title: 'Satisfaction',
      questionnaireId: questionnaire.id,
      sequenceNumber: 1,
      isIdentificationPage: false,
    };
    const page = await this.pageRepository.save(pageData);
    this.logger.log(`Página criada: ${page.title}`);

    // 5. Create page question association - following the CreatePageQuestionDTO
    const pageQuestionData: CreatePageQuestionDTO = {
      pageId: page.id,
      questionId: question.id,
      priority: 1,
      required: true,
      configuration: {},
      alerts: [],
    };
    const pageQuestion =
      await this.pageQuestionRepository.save(pageQuestionData);
    this.logger.log(`Associação page-question criada: ID ${pageQuestion.id}`);

    this.logger.log('Seed da estrutura completa finalizada com sucesso.');
    return { success: true };
  }
}
