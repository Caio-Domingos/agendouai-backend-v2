import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { CompanyEntity } from '../companies/companies.entity';
import { PageQuestionEntity } from '../page-question/page-question.entity';
import { Question, QuestionType } from './questions.model';

/**
 * Entidade de questão para persistência no banco de dados.
 *
 * Implementa a interface Question e define as colunas e relacionamentos
 * necessários para o armazenamento de questões no sistema.
 */
@Entity('questions')
@Index('idx_question_slug', ['slug'])
@Index('idx_question_company', ['companyId'])
@Index('idx_question_type', ['type'])
export class QuestionEntity extends BaseEntity implements Question {
  // Propriedades principais
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column({
    type: 'jsonb',
    default: {},
  })
  configuration: Record<string, any>;

  @Column({ nullable: true, name: 'company_id' })
  companyId?: number;

  // Relacionamentos
  @ManyToOne(() => CompanyEntity, (company) => company.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @OneToMany(
    () => PageQuestionEntity,
    (pageQuestion) => pageQuestion.question,
    {
      cascade: true,
    },
  )
  pageQuestions: Relation<PageQuestionEntity[]>;
}
