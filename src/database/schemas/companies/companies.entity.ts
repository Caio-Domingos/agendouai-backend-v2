import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { AlertEntity } from '../alerts/alerts.entity';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { QuestionEntity } from '../questions/questions.entity';
import { SubmissionEntity } from '../submissions/submissions.entity';
import { UserEntity } from '../user/user.entity';
import { Company, CompanyStatus } from './companies.model';

@Entity('companies')
@Index('idx_company_name', ['name'])
export class CompanyEntity extends BaseEntity implements Company {
  @Column()
  name: string;

  @Column({ unique: true })
  @Index('idx_company_cnpj')
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

  @OneToMany(() => UserEntity, (user) => user.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  users: Relation<UserEntity[]>;

  @OneToMany(
    () => QuestionnaireEntity,
    (questionnaire) => questionnaire.company,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  questionnaires: Relation<QuestionnaireEntity[]>;

  @OneToMany(() => QuestionEntity, (question) => question.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  questions: Relation<QuestionEntity[]>;

  @OneToMany(() => SubmissionEntity, (submission) => submission.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  submissions: Relation<SubmissionEntity[]>;

  @OneToMany(() => AlertEntity, (alert) => alert.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  alerts: Relation<AlertEntity[]>;
}
