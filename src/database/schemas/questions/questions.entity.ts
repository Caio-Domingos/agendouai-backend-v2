import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Question, QuestionType } from './questions.model';

@Entity('questions')
export class QuestionEntity extends BaseEntity implements Question {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column({
    type: 'jsonb',
    default: {},
  })
  configuration: Record<string, any>;
}
