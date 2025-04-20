import { Column, Entity, OneToMany, Relation } from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { AlertEntity } from '../alerts/alerts.entity';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { QuestionEntity } from '../questions/questions.entity';
import { SubmissionEntity } from '../submissions/submissions.entity';
import { UserEntity } from '../user/user.entity';
import { Company, CompanyStatus } from './companies.model';

@Entity('companies')
export class CompanyEntity extends BaseEntity implements Company {
  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ nullable: true, name: 'trading_name' })
  tradingName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    default: CompanyStatus.ACTIVE,
  })
  status: CompanyStatus;

  @OneToMany(() => UserEntity, (user) => user.company)
  users: Relation<UserEntity[]>;
  @OneToMany(
    () => QuestionnaireEntity,
    (questionnaire) => questionnaire.company,
  )
  questionnaires: Relation<QuestionnaireEntity[]>;
  @OneToMany(() => QuestionEntity, (question) => question.company)
  questions: Relation<QuestionEntity[]>;
  @OneToMany(() => SubmissionEntity, (submission) => submission.company)
  submissions: Relation<SubmissionEntity[]>;
  @OneToMany(() => AlertEntity, (alert) => alert.company)
  alerts: Relation<AlertEntity[]>;
}
