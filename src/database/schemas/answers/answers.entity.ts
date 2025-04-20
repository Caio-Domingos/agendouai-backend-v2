import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { AlertEntity } from '../alerts/alerts.entity';
import { PageQuestionEntity } from '../page-question/page-question.entity';
import { SubmissionEntity } from '../submissions/submissions.entity';
import { Answer } from './answers.model';

@Entity('answers')
export class AnswerEntity extends BaseEntity implements Answer {
  @Column({ name: 'submission_id' })
  submissionId: number;

  @Column({ name: 'page_question_id' })
  pageQuestionId: number;

  @Column({
    type: 'jsonb',
  })
  value: Record<string, any>;

  @ManyToOne(() => SubmissionEntity, (submission) => submission.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'submission_id' })
  submission: Relation<SubmissionEntity>;

  @ManyToOne(() => PageQuestionEntity, (pageQuestion) => pageQuestion.answers)
  @JoinColumn({ name: 'page_question_id' })
  pageQuestion: Relation<PageQuestionEntity>;

  @OneToMany(() => AlertEntity, (alert) => alert.answer, {
    cascade: true,
  })
  alerts: Relation<AlertEntity[]>;
}
