import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { CompaniesEntity } from 'src/database/schemas/companies/companies.entity';
import {
  CreateCompaniesDTO,
  UpdateCompaniesDTO,
} from 'src/database/schemas/companies/companies.dto';
import { CompaniesRepository } from 'src/database/schemas/companies/companies.repository';
import {
  WEEKDAY_NAMES,
  WeekDayIndex,
} from 'src/database/schemas/availabilities/availabilities.model';
import { CreateAvailabilitiesDTO } from 'src/database/schemas/availabilities/availabilities.dto';
import { AvailabilitiesService } from '../availabilities/availabilities.service';

@Injectable()
export class CompaniesService extends CrudQueryService<
  CompaniesEntity,
  CreateCompaniesDTO,
  UpdateCompaniesDTO
> {
  constructor(
    private companiesRepository: CompaniesRepository,
    private readonly availabilitiesService: AvailabilitiesService,
  ) {
    super(companiesRepository);
  }

  protected async beforeCreate(
    dto: CreateCompaniesDTO,
    user?: any,
  ): Promise<CreateCompaniesDTO> {
    try {
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado na requisição');
      }
      dto.createdBy = user['id'];
      dto.updatedBy = user['id'];

      // Checar duplicidade de CNPJ
      try {
        const existingCompany = await this.companiesRepository.findByCnpj(
          dto.cpfCnpj,
        );
        if (existingCompany) {
          throw new ConflictException('CNPJ já cadastrado');
        }
      } catch (error) {
        throw error instanceof HttpException
          ? error
          : new HttpException(error.message, 500);
      }

      // TODO: Validar o CPF/CNPJ

      return dto;
    } catch (error) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, 500);
    }
  }

  protected async afterCreate(
    entity: CompaniesEntity,
    dto: CreateCompaniesDTO,
    user?: any,
  ): Promise<CompaniesEntity> {
    // TODO: Plans aqui

    const hasAvailability =
      dto.companyAvailabilities && dto.companyAvailabilities.length > 0;

    const days: CreateAvailabilitiesDTO[] = [];
    if (hasAvailability) {
      // Checar se tem os 7 dias da semana
      for (const day of WEEKDAY_NAMES) {
        const hasDay = dto.companyAvailabilities!.find(
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
          newDay.companyId = entity.id;
          newDay.spaceId = undefined;

          days.push(newDay);
          break;
        } else {
          hasDay.companyId = entity.id;
          days.push(hasDay);
        }
      }
    } else {
      // Se não tem disponibilidade, criar os 7 dias da semana
      console.log(
        'Criando disponibilidade padrão para os 7 dias da semana para a empresa:',
        entity,
      );
      for (const day of WEEKDAY_NAMES) {
        const newDay = new CreateAvailabilitiesDTO();
        newDay.weekday = day;
        newDay.weekdayIndex = WeekDayIndex[day];
        newDay.openingTime = 540; // 9:00 AM
        newDay.closingTime = 1020; // 5:00 PM
        newDay.intervalMinutes = 30;
        newDay.minDaysCancel = 1;
        newDay.isOpen = false;
        newDay.is24Hours = false;
        newDay.configuration = {};
        newDay.companyId = entity.id;
        newDay.spaceId = undefined;
        console.log('Criando disponibilidade para o dia:', newDay);
        days.push(newDay);
      }
    }

    // Criar as disponibilidades
    const availabilities: any[] = [];
    for (const day of days) {
      console.log('Criando disponibilidade para o dia:', day);
      const availability = await this.availabilitiesService.create(day);
      if (!availability) {
        throw new HttpException('Erro ao criar disponibilidade', 500);
      }
      availabilities.push(availability);
    }

    entity.availabilities = availabilities;
    return entity;
  }

  protected async beforeUpdate(
    id: number,
    dto: UpdateCompaniesDTO,
    user?: any,
  ): Promise<UpdateCompaniesDTO> {
    if (!user) {
      throw new Error('User not found in request');
    }
    dto.updatedBy = user['id'];
    return dto;
  }
}
