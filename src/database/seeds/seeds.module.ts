import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';

import { DatabaseCleanService } from '../clean/database-clean.service';
import { UserEntity } from '../schemas/users/users.entity';
import { PeopleEntity } from '../schemas/people/people.entity';
import { CompaniesEntity } from '../schemas/companies/companies.entity';
import { CompanyCategoriesEntity } from '../schemas/company-categories/company-categories.entity';
import { PlansEntity } from '../schemas/plans/plans.entity';
import { CompanySubscriptionHistoryEntity } from '../schemas/company-subscription-history/company-subscription-history.entity';
import { SpacesEntity } from '../schemas/spaces/spaces.entity';
import { SpaceManagersEntity } from '../schemas/space-managers/space-managers.entity';
import { BookingEntity } from '../schemas/bookings/bookings.entity';
import { BookingStatusHistoryEntity } from '../schemas/booking-status-history/booking-status-history.entity';
import { AvailabilitiesEntity } from '../schemas/availabilities/availabilities.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PeopleEntity,
      CompaniesEntity,
      CompanyCategoriesEntity,
      PlansEntity,
      CompanySubscriptionHistoryEntity,
      SpacesEntity,
      SpaceManagersEntity,
      BookingEntity,
      BookingStatusHistoryEntity,
      AvailabilitiesEntity,
    ]),
    ConfigModule,
  ],
  providers: [SeedsService, DatabaseCleanService],
  controllers: [SeedsController],
  exports: [SeedsService, DatabaseCleanService],
})
export class SeedsModule {}
