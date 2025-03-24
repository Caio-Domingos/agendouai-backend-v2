import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Questionnaire, QuestionnaireStatus } from './questionnaires.model';
import { UserEntity } from '../user/user.entity';
import { PageEntity } from '../pages/pages.entity';
import { SubmissionEntity } from '../submissions/submissions.entity';

@Entity('questionnaires')
export class QuestionnaireEntity extends BaseEntity implements Questionnaire {
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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  creator: Relation<UserEntity>;

  @OneToMany(() => PageEntity, (page) => page.questionnaire, {
    cascade: true,
  })
  pages: Relation<PageEntity[]>;

  @OneToMany(() => SubmissionEntity, (submission) => submission.questionnaire)
  submissions: Relation<SubmissionEntity[]>;
}
