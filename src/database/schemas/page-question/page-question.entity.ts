import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { AnswerEntity } from '../answers/answers.entity';
import { PageEntity } from '../pages/pages.entity';
import { QuestionEntity } from '../questions/questions.entity';
import { PageQuestion } from './page-question.model';

@Entity('page_questions')
export class PageQuestionEntity extends BaseEntity implements PageQuestion {
  @Column({ name: 'page_id' })
  pageId: number;

  @Column({ name: 'question_id' })
  questionId: number;

  @Column()
  priority: number;

  @Column({ default: false })
  required: boolean;

  @Column({
    type: 'jsonb',
    default: {},
  })
  configuration: Record<string, any>;

  @Column({
    type: 'jsonb',
    default: [],
  })
  alerts: Array<any>;

  @ManyToOne(() => PageEntity, (page) => page.pageQuestions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'page_id' })
  page: Relation<PageEntity>;

  @ManyToOne(() => QuestionEntity, (question) => question.pageQuestions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: Relation<QuestionEntity>;

  @OneToMany(() => AnswerEntity, (answer) => answer.pageQuestion)
  answers: Relation<AnswerEntity[]>;
}
