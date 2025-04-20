import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { AlertEntity } from '../alerts/alerts.entity';
import { AnswerEntity } from '../answers/answers.entity';
import { CompanyEntity } from '../companies/companies.entity';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { Submission, SubmissionStatus } from './submissions.model';

/**
 * Entidade de submissão para persistência no banco de dados.
 *
 * Implementa a interface Submission e define as colunas e relacionamentos
 * necessários para o armazenamento de submissões no sistema.
 */
@Entity('submissions')
export class SubmissionEntity extends BaseEntity implements Submission {
  // Propriedades principais
  @Column({ name: 'questionnaire_id' })
  questionnaireId: number;

  @Column({
    name: 'started_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;

  @Column({
    name: 'completed_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  completedAt: Date;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.PARTIAL,
  })
  status: SubmissionStatus;

  @Column({ nullable: true, name: 'company_id' })
  companyId?: number;

  // Relacionamentos
  @ManyToOne(() => CompanyEntity, (company) => company.submissions)
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire) => questionnaire.submissions,
  )
  @JoinColumn({ name: 'questionnaire_id' })
  questionnaire: Relation<QuestionnaireEntity>;

  @OneToMany(() => AnswerEntity, (answer) => answer.submission, {
    cascade: true,
  })
  answers: Relation<AnswerEntity[]>;

  @OneToMany(() => AlertEntity, (alert) => alert.submission, {
    cascade: true,
  })
  alerts: Relation<AlertEntity[]>;
}
