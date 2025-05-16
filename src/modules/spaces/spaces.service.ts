import { Injectable, Inject } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { SpacesEntity } from 'src/database/schemas/spaces/spaces.entity';
import {
  CreateSpacesDTO,
  UpdateSpacesDTO,
} from 'src/database/schemas/spaces/spaces.dto';
import { SpacesRepository } from 'src/database/schemas/spaces/spaces.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  WEEKDAY_NAMES,
  WeekDayIndex,
} from 'src/database/schemas/availabilities/availabilities.model';
import { CreateAvailabilitiesDTO } from 'src/database/schemas/availabilities/availabilities.dto';
import { AvailabilitiesService } from '../availabilities/availabilities.service';

@Injectable()
export class SpacesService extends CrudQueryService<
  SpacesEntity,
  CreateSpacesDTO,
  UpdateSpacesDTO
> {
  constructor(
    private spacesRepository: SpacesRepository,
    private readonly availabilitiesService: AvailabilitiesService,
    @Inject(REQUEST) private request: Request,
  ) {
    super(spacesRepository);
  }

  protected getRequest(): any {
    return this.request;
  }
  protected getUser(): any {
    return this.request?.user;
  }

  protected async afterCreate(
    entity: SpacesEntity,
    dto: CreateSpacesDTO,
    user?: any,
    request?: Request,
  ): Promise<SpacesEntity> {
    const hasAvailability =
      dto.spaceAvailabilities && dto.spaceAvailabilities.length > 0;

    const days: CreateAvailabilitiesDTO[] = [];
    if (hasAvailability) {
      for (const day of WEEKDAY_NAMES) {
        const hasDay = dto.spaceAvailabilities!.find(
          (availability) => availability.weekday === day,
        );
        if (!hasDay) {
          const newDay = new CreateAvailabilitiesDTO();
          newDay.weekday = day;
          newDay.weekdayIndex = WeekDayIndex[day];
          newDay.openingTime = 0;
          newDay.closingTime = 1;
          newDay.intervalMinutes = 30;
          newDay.minDaysCancel = 1;
          newDay.isOpen = false;
          newDay.is24Hours = false;
          newDay.configuration = {};
          newDay.companyId = entity.companyId;
          newDay.spaceId = entity.id;
          days.push(newDay);
          break;
        } else {
          hasDay.companyId = entity.companyId;
          hasDay.spaceId = entity.id;
          days.push(hasDay);
        }
      }
    } else {
      for (const day of WEEKDAY_NAMES) {
        const newDay = new CreateAvailabilitiesDTO();
        newDay.weekday = day;
        newDay.weekdayIndex = WeekDayIndex[day];
        newDay.openingTime = 540;
        newDay.closingTime = 1020;
        newDay.intervalMinutes = 30;
        newDay.minDaysCancel = 1;
        newDay.isOpen = false;
        newDay.is24Hours = false;
        newDay.configuration = {};
        newDay.companyId = entity.companyId;
        newDay.spaceId = entity.id;
        days.push(newDay);
      }
    }

    const availabilities: any[] = [];
    for (const day of days) {
      const availability = await this.availabilitiesService.create(day);
      if (!availability) {
        throw new Error('Erro ao criar disponibilidade');
      }
      availabilities.push(availability);
    }
    entity.availabilities = availabilities;
    return entity;
  }
}
