import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { AnswerEntity } from '../answers/answers.entity';
import { CompanyEntity } from '../companies/companies.entity';
import { SubmissionEntity } from '../submissions/submissions.entity';
import { Alert, AlertConfig, AlertStatus } from './alerts.model';
import { UserEntity } from '../user/user.entity';

/**
 * Entidade de alerta para persistência no banco de dados.
 *
 * Implementa a interface Alert e define as colunas e relacionamentos
 * necessários para o armazenamento de alertas no sistema.
 */
@Entity('alerts')
@Index('idx_alert_submission', ['submissionId'])
@Index('idx_alert_answer', ['answerId'])
@Index('idx_alert_company', ['companyId'])
@Index('idx_alert_status', ['status'])
@Index('idx_alert_company_status', ['companyId', 'status'])
export class AlertEntity extends BaseEntity implements Alert {
  // Propriedades principais
  @Column({ name: 'submission_id' })
  submissionId: number;

  @Column({ name: 'answer_id' })
  answerId: number;

  @Column({
    name: 'alert_config',
    type: 'jsonb',
    default: {},
  })
  alertConfig: AlertConfig;

  @Column({
    type: 'enum',
    enum: AlertStatus,
    default: AlertStatus.NEW,
  })
  status: AlertStatus;

  @Column({ nullable: true, name: 'company_id' })
  companyId?: number;

  @Column({ nullable: true, type: 'text', name: 'observation' })
  observation?: string;

  @Column({ nullable: true, name: 'response_submission_id' })
  responseSubmissionId?: number;

  @Column({
    nullable: true,
    type: 'timestamp with time zone',
    name: 'responded_at',
  })
  respondedAt?: Date;

  @Column({ nullable: true, name: 'responded_by' })
  respondedBy?: number;

  // Relacionamentos
  @ManyToOne(() => CompanyEntity, (company) => company.alerts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @ManyToOne(() => SubmissionEntity, (submission) => submission.alerts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'submission_id' })
  submission: Relation<SubmissionEntity>;

  @ManyToOne(() => AnswerEntity, (answer) => answer.alerts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'answer_id' })
  answer: Relation<AnswerEntity>;

  @ManyToOne(
    () => SubmissionEntity,
    (submission) => submission.alertsResponse,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'response_submission_id' })
  responseSubmission: Relation<SubmissionEntity>;

  @ManyToOne(() => UserEntity, (user) => user.alertsResponse, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'responded_by' })
  respondedByUser: Relation<UserEntity>;
}
