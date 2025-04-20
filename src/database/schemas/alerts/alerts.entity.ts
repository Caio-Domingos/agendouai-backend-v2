import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { AnswerEntity } from '../answers/answers.entity';
import { CompanyEntity } from '../companies/companies.entity';
import { SubmissionEntity } from '../submissions/submissions.entity';
import { Alert, AlertStatus } from './alerts.model';

/**
 * Entidade de alerta para persistência no banco de dados.
 *
 * Implementa a interface Alert e define as colunas e relacionamentos
 * necessários para o armazenamento de alertas no sistema.
 */
@Entity('alerts')
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
  alertConfig: Record<string, any>;

  @Column({
    type: 'enum',
    enum: AlertStatus,
    default: AlertStatus.NEW,
  })
  status: AlertStatus;

  @Column({ nullable: true, name: 'company_id' })
  companyId?: number;

  // Relacionamentos
  @ManyToOne(() => CompanyEntity, (company) => company.alerts)
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
}
