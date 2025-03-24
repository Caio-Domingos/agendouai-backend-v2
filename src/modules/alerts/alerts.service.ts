import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { AlertEntity } from 'src/database/schemas/alerts/alerts.entity';
import {
  CreateAlertDTO,
  UpdateAlertDTO,
} from 'src/database/schemas/alerts/alerts.dto';
import { AlertRepository } from 'src/database/schemas/alerts/alerts.repository';

@Injectable()
export class AlertService extends CrudQueryService<
  AlertEntity,
  CreateAlertDTO,
  UpdateAlertDTO
> {
  constructor(private alertRepository: AlertRepository) {
    super(alertRepository);
  }
}
