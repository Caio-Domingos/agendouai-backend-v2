import { BadRequestException, Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { AnswerEntity } from 'src/database/schemas/answers/answers.entity';
import {
  CreateAnswerDTO,
  UpdateAnswerDTO,
} from 'src/database/schemas/answers/answers.dto';
import { AnswerRepository } from 'src/database/schemas/answers/answers.repository';
import { PageQuestionService } from '../page-question/page-question.service';
import { AlertHandler } from '../alerts/alert.handler';
import { QuestionType } from 'src/database/schemas/questions/questions.model';
import { AlertService } from '../alerts/alerts.service';
import { CreateAlertDTO } from 'src/database/schemas/alerts/alerts.dto';
import { AlertStatus } from 'src/database/schemas/alerts/alerts.model';
import { QuestionAlert } from 'src/database/schemas/page-question/page-question.model';

@Injectable()
export class AnswerService extends CrudQueryService<
  AnswerEntity,
  CreateAnswerDTO,
  UpdateAnswerDTO
> {
  constructor(
    private answerRepository: AnswerRepository,
    private pageQuestionService: PageQuestionService,
    private alertService: AlertService,
  ) {
    super(answerRepository);
  }

  protected beforeCreate(dto: CreateAnswerDTO): Promise<CreateAnswerDTO> {
    // TODO: Validate atual submission ID status and if has already answered this question

    return Promise.resolve(dto);
  }

  protected async afterCreate(entity: AnswerEntity): Promise<AnswerEntity> {
    try {
      // check if needs alert
      // TODO: Pass this to event emitter later
      // TODO: Pass relations page and questionnaire to after alerts tratatives
      const pageQuestion = await this.pageQuestionService.findById(
        entity.pageQuestionId,
        {
          relations: [
            {
              path: 'question',
              alias: 'question',
            },
            {
              path: 'page',
              alias: 'page',
            },
            {
              path: 'page.questionnaire',
              alias: 'questionnaire',
            },
          ],
        },
      );

      if (!pageQuestion) {
        throw new BadRequestException(
          `Página de perguntas não encontrada para o ID: ${entity.pageQuestionId}`,
        );
      }

      const alerts = pageQuestion.alerts;
      if (!alerts || alerts.length === 0) {
        console.log(
          `Nenhum alerta a ser verificado para a pergunta ${pageQuestion.questionId} na pág. com ID: ${pageQuestion.id}`,
        );
        return entity;
      }

      let answerValue: string | number | boolean | Date | null = null;
      if (pageQuestion.question && pageQuestion.question.type) {
        answerValue = this.extractAnswerValue(
          pageQuestion.question.type,
          entity,
        );
      }
      // TODO: get all missing alerts, instead of just the first one
      const shouldAlert = this.shouldTriggerAlert(
        alerts,
        pageQuestion.question.type,
        answerValue,
      );

      if (shouldAlert) {
        console.log(
          `Alerta ${JSON.stringify(alerts)} acionado para a pergunta ${pageQuestion.questionId} na pág. com ID: ${pageQuestion.id} com a resposta ${JSON.stringify(entity.value)}`,
        );

        const responseWay: 'questionnaire' | 'observation' = pageQuestion.page
          ?.questionnaire?.resolveAlertsQuestionnaireId
          ? 'questionnaire'
          : this.getTriggerAlert(
                alerts,
                pageQuestion.question.type,
                answerValue,
              )?.resolveAlertQuestionnaireId
            ? 'questionnaire'
            : 'observation';

        let responseQuestionnaireId: number | undefined;
        if (responseWay === 'questionnaire') {
          responseQuestionnaireId =
            this.getTriggerAlert(
              alerts,
              pageQuestion.question.type,
              answerValue,
            )?.resolveAlertQuestionnaireId ||
            pageQuestion.page?.questionnaire?.resolveAlertsQuestionnaireId;
        }

        // Criar novo alerta
        const alertDTO: CreateAlertDTO = {
          submissionId: entity.submissionId,
          answerId: entity.id,
          alertConfig: {
            firedBy: this.getTriggerAlert(
              alerts,
              pageQuestion.question.type,
              answerValue,
            )!,
            firedAt: new Date().toISOString(),
            responseWay,
            responseQuestionnaireId,
          },
          status: AlertStatus.NEW,
          // TODO: Passar companyId de algum lugar
        };

        try {
          const alert = await this.alertService.create(alertDTO);
          console.log('Alerta criado com sucesso:', alert);
        } catch (error) {
          console.error('Error creating alert:', error);
          throw new BadRequestException(
            `Erro ao criar alerta para a resposta ${entity.id}: ${error.message}`,
          );
        }
      }

      return entity;
    } catch (error) {
      console.error('Error in pageQuestion.afterCreate:', error);
      throw error;
    }
  }

  private getTriggerAlert(
    alerts: QuestionAlert[],
    questionType: QuestionType,
    answerValue: string | number | boolean | Date | null,
  ): QuestionAlert | undefined {
    const verificator = new AlertHandler();
    return alerts.find((alert) => verificator.verifyAlert(alert, answerValue));
  }
  private shouldTriggerAlert(
    alerts: QuestionAlert[],
    questionType: QuestionType,
    answerValue: string | number | boolean | Date | null,
  ): boolean {
    const verificator = new AlertHandler();
    return alerts.some((alert) => verificator.verifyAlert(alert, answerValue));
  }

  private extractAnswerValue(
    questionType: QuestionType,
    entity: AnswerEntity,
  ): string | number | boolean | Date | null {
    // TODO: Refatorar isso e passar pra um QuestionHandler
    switch (questionType) {
      case QuestionType.TEXT:
        return entity.value.text ?? null;
      case QuestionType.NUMBER:
        return entity.value.number ?? null;
      case QuestionType.CHOICE:
        return entity.value.selected ?? null;
      case QuestionType.DATE:
        if (!entity.value.date) return null;
        if (entity.value.date instanceof Date) return entity.value.date;
        if (typeof entity.value.date === 'string') {
          // Espera formato DD/MM/YYYY
          const [day, month, year] = entity.value.date.split('/');
          if (day && month && year) {
            return new Date(Number(year), Number(month) - 1, Number(day));
          }
          // Se não for possível converter, retorna null
          return null;
        }
        return null;
      case QuestionType.FILE:
        return null;
      default:
        return null;
    }
  }
}
