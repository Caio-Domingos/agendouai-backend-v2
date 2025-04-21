import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../schemas/user/user.entity';
import { UserRole, UserStatus } from '../schemas/user/user.model';
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
import { CompanyEntity } from '../schemas/companies/companies.entity';
import { CompanyStatus } from '../schemas/companies/companies.model';
import { SubmissionEntity } from '../schemas/submissions/submissions.entity';
import { SubmissionStatus } from '../schemas/submissions/submissions.model';
import { AnswerEntity } from '../schemas/answers/answers.entity';

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
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    @InjectRepository(SubmissionEntity)
    private submissionRepository: Repository<SubmissionEntity>,
    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,
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
      await manager.query('TRUNCATE TABLE companies CASCADE');
    });

    this.logger.log('Tabelas truncadas com sucesso.');
  }

  /**
   * Seed complete structure: user -> questionnaire -> page -> question -> page_question
   */
  async seedCompleteStructure() {
    this.logger.log('Iniciando seed da estrutura completa...');

    // 1. Create company
    const companyData = {
      name: 'Empresa Exemplo',
      cnpj: '12.345.678/0001-90',
      tradingName: 'EmpEx',
      phone: '(11) 1234-5678',
      status: CompanyStatus.ACTIVE,
    };
    const company = await this.companyRepository.save(companyData);
    this.logger.log(`Empresa criada: ${company.name}`);

    // 2. Create users with different roles
    const saltRounds = this.configService.get<number>(
      'auth.security.bcryptSaltRounds',
      10,
    );
    const hashedPassword = await bcrypt.hash('Senha@123', saltRounds);

    // Admin user (no company association)
    const adminUser = await this.userRepository.save({
      name: 'Usuário Administrador',
      email: 'admin@exemplo.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.ADMIN,
    });
    this.logger.log(`Usuário ADMIN criado: ${adminUser.email}`);

    // Company user (with company association)
    const companyUser = await this.userRepository.save({
      name: 'Gerente da Empresa',
      email: 'gerente@exemplo.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.COMPANY,
      companyId: company.id,
    });
    this.logger.log(`Usuário COMPANY criado: ${companyUser.email}`);

    // Unit user
    const unitUser = await this.userRepository.save({
      name: 'Gerente de Unidade',
      email: 'unidade@exemplo.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.UNIT,
      companyId: company.id,
    });
    this.logger.log(`Usuário UNIT criado: ${unitUser.email}`);

    // Employee user
    const employeeUser = await this.userRepository.save({
      name: 'Funcionário',
      email: 'funcionario@exemplo.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.EMPLOYEE,
      companyId: company.id,
    });
    this.logger.log(`Usuário EMPLOYEE criado: ${employeeUser.email}`);

    // 3. Create questions for each type (excluding FILE)
    // TEXT question
    const textQuestion = await this.questionRepository.save({
      slug: 'feedback-texto',
      title: 'Por favor, forneça seu feedback',
      description: 'Conte-nos o que você achou do nosso serviço',
      type: QuestionType.TEXT,
      configuration: {
        minLength: 10,
        maxLength: 500,
        placeholder: 'Digite seu feedback aqui...',
      },
      companyId: company.id,
    });
    this.logger.log(`Questão TEXT criada: ${textQuestion.title}`);

    // NUMBER question
    const numberQuestion = await this.questionRepository.save({
      slug: 'avaliacao-servico',
      title: 'Como você avalia nosso serviço?',
      description: 'Avalie de 1 a 10',
      type: QuestionType.NUMBER,
      configuration: {
        min: 1,
        max: 10,
        step: 1,
      },
      companyId: company.id,
    });
    this.logger.log(`Questão NUMBER criada: ${numberQuestion.title}`);

    // DATE question
    const dateQuestion = await this.questionRepository.save({
      slug: 'data-visita',
      title: 'Quando você visitou nossa loja?',
      description: 'Selecione a data da sua última visita',
      type: QuestionType.DATE,
      configuration: {
        minDate: '2023-01-01',
        maxDate: '2023-12-31',
        format: 'DD/MM/YYYY',
      },
      companyId: company.id,
    });
    this.logger.log(`Questão DATE criada: ${dateQuestion.title}`);

    // CHOICE question
    const choiceQuestion = await this.questionRepository.save({
      slug: 'nivel-satisfacao',
      title: 'Qual seu nível de satisfação com nossos produtos?',
      description: 'Selecione a opção que melhor representa sua opinião',
      type: QuestionType.CHOICE,
      configuration: {
        options: [
          { value: 'muito_satisfeito', label: 'Muito Satisfeito' },
          { value: 'satisfeito', label: 'Satisfeito' },
          { value: 'neutro', label: 'Neutro' },
          { value: 'insatisfeito', label: 'Insatisfeito' },
          { value: 'muito_insatisfeito', label: 'Muito Insatisfeito' },
        ],
        multiple: false,
      },
      companyId: company.id,
    });
    this.logger.log(`Questão CHOICE criada: ${choiceQuestion.title}`);

    // 4. Create a questionnaire with all questions
    const questionnaire = await this.questionnaireRepository.save({
      title: 'Pesquisa de Satisfação do Cliente',
      description:
        'Por favor, ajude-nos a melhorar respondendo a estas perguntas',
      status: QuestionnaireStatus.PUBLISHED,
      createdBy: adminUser.id,
      companyId: company.id,
    });
    this.logger.log(`Questionário criado: ${questionnaire.title}`);

    // Create a page for the questionnaire
    const page = await this.pageRepository.save({
      title: 'Formulário de Feedback',
      questionnaireId: questionnaire.id,
      sequenceNumber: 1,
      isIdentificationPage: false,
    });
    this.logger.log(`Página criada: ${page.title}`);

    // Associate all questions with the page
    const questions = [
      textQuestion,
      numberQuestion,
      dateQuestion,
      choiceQuestion,
    ];
    for (let i = 0; i < questions.length; i++) {
      await this.pageQuestionRepository.save({
        pageId: page.id,
        questionId: questions[i].id,
        priority: i + 1,
        required: true,
        configuration: {},
        alerts: [],
      });
    }
    this.logger.log('Questões associadas à página');

    // 5. Create a submission for the questionnaire with answers
    const submission = await this.submissionRepository.save({
      questionnaireId: questionnaire.id,
      startedAt: new Date(),
      completedAt: new Date(),
      status: SubmissionStatus.COMPLETE,
      companyId: company.id,
    });
    this.logger.log(`Submissão criada para o questionário: ${submission.id}`);

    // Create answers for each question in the submission
    // Get the page-question associations to reference in answers
    const pageQuestions = await this.pageQuestionRepository.find({
      where: { pageId: page.id },
    });

    // TEXT answer
    await this.answerRepository.save({
      submissionId: submission.id,
      pageQuestionId: pageQuestions[0].id,
      value: {
        text: 'O serviço foi excelente. A equipe foi muito prestativa e amigável.',
      },
    });

    // NUMBER answer
    await this.answerRepository.save({
      submissionId: submission.id,
      pageQuestionId: pageQuestions[1].id,
      value: { number: 9 },
    });

    // DATE answer
    await this.answerRepository.save({
      submissionId: submission.id,
      pageQuestionId: pageQuestions[2].id,
      value: { date: '15/06/2023' },
    });

    // CHOICE answer
    await this.answerRepository.save({
      submissionId: submission.id,
      pageQuestionId: pageQuestions[3].id,
      value: { selected: 'muito_satisfeito' },
    });

    this.logger.log('Respostas criadas para todas as questões');

    this.logger.log('Seed da estrutura completa finalizada com sucesso.');
    return { success: true };
  }
}
