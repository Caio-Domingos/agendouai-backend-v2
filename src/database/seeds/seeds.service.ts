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
      name: 'Example Company',
      cnpj: '12.345.678/0001-90',
      tradingName: 'ExCo',
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
    const hashedPassword = await bcrypt.hash('Password@123', saltRounds);

    // Admin user (no company association)
    const adminUser = await this.userRepository.save({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.ADMIN,
    });
    this.logger.log(`Usuário ADMIN criado: ${adminUser.email}`);

    // Company user (with company association)
    const companyUser = await this.userRepository.save({
      name: 'Company Manager',
      email: 'manager@example.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.COMPANY,
      companyId: company.id,
    });
    this.logger.log(`Usuário COMPANY criado: ${companyUser.email}`);

    // Unit user
    const unitUser = await this.userRepository.save({
      name: 'Unit Manager',
      email: 'unit@example.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.UNIT,
      companyId: company.id,
    });
    this.logger.log(`Usuário UNIT criado: ${unitUser.email}`);

    // Employee user
    const employeeUser = await this.userRepository.save({
      name: 'Employee',
      email: 'employee@example.com',
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      role: UserRole.EMPLOYEE,
      companyId: company.id,
    });
    this.logger.log(`Usuário EMPLOYEE criado: ${employeeUser.email}`);

    // 3. Create questions for each type (excluding FILE)
    // TEXT question
    const textQuestion = await this.questionRepository.save({
      slug: 'feedback-text',
      title: 'Please provide your feedback',
      description: 'Tell us what you think about our service',
      type: QuestionType.TEXT,
      configuration: {
        minLength: 10,
        maxLength: 500,
        placeholder: 'Enter your feedback here...',
      },
      companyId: company.id,
    });
    this.logger.log(`Questão TEXT criada: ${textQuestion.title}`);

    // NUMBER question
    const numberQuestion = await this.questionRepository.save({
      slug: 'service-rating',
      title: 'How would you rate our service?',
      description: 'Rate from 1 to 10',
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
      slug: 'visit-date',
      title: 'When did you visit our store?',
      description: 'Select the date of your last visit',
      type: QuestionType.DATE,
      configuration: {
        minDate: '2023-01-01',
        maxDate: '2023-12-31',
        format: 'YYYY-MM-DD',
      },
      companyId: company.id,
    });
    this.logger.log(`Questão DATE criada: ${dateQuestion.title}`);

    // CHOICE question
    const choiceQuestion = await this.questionRepository.save({
      slug: 'satisfaction-level',
      title: 'How satisfied are you with our products?',
      description: 'Select the option that best represents your opinion',
      type: QuestionType.CHOICE,
      configuration: {
        options: [
          { value: 'very_satisfied', label: 'Very Satisfied' },
          { value: 'satisfied', label: 'Satisfied' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'dissatisfied', label: 'Dissatisfied' },
          { value: 'very_dissatisfied', label: 'Very Dissatisfied' },
        ],
        multiple: false,
      },
      companyId: company.id,
    });
    this.logger.log(`Questão CHOICE criada: ${choiceQuestion.title}`);

    // 4. Create a questionnaire with all questions
    const questionnaire = await this.questionnaireRepository.save({
      title: 'Customer Feedback Survey',
      description: 'Please help us improve by answering these questions',
      status: QuestionnaireStatus.PUBLISHED,
      createdBy: adminUser.id,
      companyId: company.id,
    });
    this.logger.log(`Questionário criado: ${questionnaire.title}`);

    // Create a page for the questionnaire
    const page = await this.pageRepository.save({
      title: 'Feedback Form',
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
        text: 'The service was excellent. Staff was very helpful and friendly.',
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
      value: { date: '2023-06-15' },
    });

    // CHOICE answer
    await this.answerRepository.save({
      submissionId: submission.id,
      pageQuestionId: pageQuestions[3].id,
      value: { selected: 'very_satisfied' },
    });

    this.logger.log('Respostas criadas para todas as questões');

    this.logger.log('Seed da estrutura completa finalizada com sucesso.');
    return { success: true };
  }
}
