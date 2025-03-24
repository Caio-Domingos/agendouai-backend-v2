import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { AlertEntity } from 'src/database/schemas/alerts/alerts.entity';
import {
  CreateAlertDTO,
  AlertDto,
  UpdateAlertDTO,
} from 'src/database/schemas/alerts/alerts.dto';
import { AlertService } from './alerts.service';

// Criamos o controlador base usando a função factory
const AlertControllerBase = CrudQueryController<
  AlertEntity,
  typeof CreateAlertDTO,
  typeof UpdateAlertDTO,
  typeof AlertDto
>('alerts', CreateAlertDTO, UpdateAlertDTO, AlertDto);

@ApiTags('Alertas')
@Controller('alerts')
export class AlertController extends AlertControllerBase {
  constructor(readonly alertService: AlertService) {
    super(alertService);
  }
}
