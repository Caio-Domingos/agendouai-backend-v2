import {
  QuestionAlert,
  AlertCompType,
} from 'src/database/schemas/page-question/page-question.model';

export class AlertHandler {
  verifyAlert(
    alert: QuestionAlert,
    value: string | number | boolean | Date | null,
  ): boolean {
    const { comp, valueExpected } = alert;

    // Trate nulls como não atendendo ao alerta
    if (value === null || valueExpected === null) return false;

    switch (comp) {
      case AlertCompType.EQUALS:
        return value === valueExpected;
      case AlertCompType.NOT_EQUALS:
        return value !== valueExpected;
      case AlertCompType.GREATER_THAN:
        if (typeof value === 'number' && typeof valueExpected === 'number') {
          return value > valueExpected;
        }
        if (value instanceof Date && valueExpected instanceof Date) {
          return value > valueExpected;
        }
        return false;
      case AlertCompType.LESS_THAN:
        if (typeof value === 'number' && typeof valueExpected === 'number') {
          return value < valueExpected;
        }
        if (value instanceof Date && valueExpected instanceof Date) {
          return value < valueExpected;
        }
        return false;
      case AlertCompType.CONTAINS:
        if (typeof value === 'string' && typeof valueExpected === 'string') {
          return value.includes(valueExpected);
        }
        if (Array.isArray(value)) {
          return value.includes(valueExpected);
        }
        return false;
      default:
        return false;
    }
  }
}
