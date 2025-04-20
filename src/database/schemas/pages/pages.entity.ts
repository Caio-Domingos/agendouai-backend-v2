import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { PageQuestionEntity } from '../page-question/page-question.entity';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { Page } from './pages.model';

@Entity('pages')
export class PageEntity extends BaseEntity implements Page {
  @Column({ name: 'questionnaire_id' })
  questionnaireId: number;

  @Column()
  title: string;

  @Column({ name: 'sequence_number' })
  sequenceNumber: number;

  @Column({ name: 'is_identification_page', default: false })
  isIdentificationPage: boolean;

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire) => questionnaire.pages,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'questionnaire_id' })
  questionnaire: Relation<QuestionnaireEntity>;

  @OneToMany(() => PageQuestionEntity, (pageQuestion) => pageQuestion.page, {
    cascade: true,
  })
  pageQuestions: Relation<PageQuestionEntity[]>;
}
