import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Alert, AlertStatus } from './alerts.model';
import { SubmissionEntity } from '../submissions/submissions.entity';
import { AnswerEntity } from '../answers/answers.entity';

@Entity('alerts')
export class AlertEntity extends BaseEntity implements Alert {
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
