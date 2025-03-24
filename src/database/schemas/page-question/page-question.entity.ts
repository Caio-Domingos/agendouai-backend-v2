import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { PageQuestion } from './page-question.model';
import { PageEntity } from '../pages/pages.entity';
import { QuestionEntity } from '../questions/questions.entity';
import { AnswerEntity } from '../answers/answers.entity';

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
