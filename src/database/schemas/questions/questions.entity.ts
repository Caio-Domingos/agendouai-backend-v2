import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Question, QuestionType } from './questions.model';
import { PageQuestionEntity } from '../page-question/page-question.entity';
import { Relation } from 'typeorm';

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

  @OneToMany(
    () => PageQuestionEntity,
    (pageQuestion) => pageQuestion.question,
    {
      cascade: true,
    },
  )
  pageQuestions: Relation<PageQuestionEntity[]>;
}
