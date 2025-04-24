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
import { AlertEntity } from '../alerts/alerts.entity';
import { AnswerEntity } from '../answers/answers.entity';
import { CompanyEntity } from '../companies/companies.entity';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { Submission, SubmissionStatus } from './submissions.model';
import { UserEntity } from '../user/user.entity';
import { UnitEntity } from '../units/units.entity';

/**
 * Entidade de submissão para persistência no banco de dados.
 *
 * Implementa a interface Submission e define as colunas e relacionamentos
 * necessários para o armazenamento de submissões no sistema.
 */
@Entity('submissions')
@Index('idx_submission_questionnaire', ['questionnaireId'])
@Index('idx_submission_creator', ['createdBy'])
@Index('idx_submission_company', ['companyId'])
@Index('idx_submission_status', ['status'])
@Index('idx_submission_quest_status', ['questionnaireId', 'status'])
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
  @Column({ nullable: true, name: 'unit_id' })
  unitId?: number;
  @Column({ nullable: true, name: 'created_by' })
  createdBy?: number;

  // Relacionamentos
  @ManyToOne(() => UserEntity, (user) => user.submissions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by' })
  creator: Relation<UserEntity>;

  @ManyToOne(() => CompanyEntity, (company) => company.submissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @ManyToOne(() => UnitEntity, (unit) => unit.submissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'unit_id' })
  unit: Relation<UnitEntity>;

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire) => questionnaire.submissions,
    {
      onDelete: 'CASCADE',
    },
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
