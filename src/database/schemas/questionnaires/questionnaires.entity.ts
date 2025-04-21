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
import { PageEntity } from '../pages/pages.entity';
import { SubmissionEntity } from '../submissions/submissions.entity';
import { UserEntity } from '../user/user.entity';
import { Questionnaire, QuestionnaireStatus } from './questionnaires.model';

/**
 * Entidade de questionário para persistência no banco de dados.
 *
 * Implementa a interface Questionnaire e define as colunas e relacionamentos
 * necessários para o armazenamento de questionários no sistema.
 */
@Entity('questionnaires')
@Index('idx_questionnaire_company', ['companyId'])
@Index('idx_questionnaire_status', ['status'])
@Index('idx_questionnaire_company_status', ['companyId', 'status'])
export class QuestionnaireEntity extends BaseEntity implements Questionnaire {
  // Propriedades principais
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: QuestionnaireStatus,
    default: QuestionnaireStatus.DRAFT,
  })
  status: QuestionnaireStatus;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ nullable: true, name: 'company_id' })
  companyId?: number;

  // Relacionamentos
  @ManyToOne(() => CompanyEntity, (company) => company.questionnaires, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by' })
  creator: Relation<UserEntity>;

  @OneToMany(() => PageEntity, (page) => page.questionnaire, {
    cascade: true,
  })
  pages: Relation<PageEntity[]>;

  @OneToMany(() => SubmissionEntity, (submission) => submission.questionnaire, {
    cascade: true,
  })
  submissions: Relation<SubmissionEntity[]>;
}
