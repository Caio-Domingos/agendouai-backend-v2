import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Submission, SubmissionStatus } from './submissions.model';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';

@Entity('submissions')
export class SubmissionEntity extends BaseEntity implements Submission {
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

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire) => questionnaire.submissions,
  )
  @JoinColumn({ name: 'questionnaire_id' })
  questionnaire: Relation<QuestionnaireEntity>;
}
