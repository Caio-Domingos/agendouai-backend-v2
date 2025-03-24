import { Module } from '@nestjs/common';
import { AlertService } from './alerts.service';
import { AlertController } from './alerts.controller';
import { AlertRepository } from 'src/database/schemas/alerts/alerts.repository';

@Module({
  exports: [AlertService],
  controllers: [AlertController],
  providers: [AlertService, AlertRepository],
})
export class AlertModule {}
