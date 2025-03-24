import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Questionnaire, QuestionnaireStatus } from './questionnaires.model';
import { UserEntity } from '../user/user.entity';

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
  creator: UserEntity;
}
