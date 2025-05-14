import { Module } from '@nestjs/common';
import { CompanySubscriptionHistoryService } from './company-subscription-history.service';
import { CompanySubscriptionHistoryController } from './company-subscription-history.controller';
import { CompanySubscriptionHistoryRepository } from 'src/database/schemas/company-subscription-history/company-subscription-history.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySubscriptionHistoryEntity } from 'src/database/schemas/company-subscription-history/company-subscription-history.entity';

@Module({
  exports: [CompanySubscriptionHistoryService],
  controllers: [CompanySubscriptionHistoryController],
  providers: [
    CompanySubscriptionHistoryService,
    CompanySubscriptionHistoryRepository,
  ],
  imports: [TypeOrmModule.forFeature([CompanySubscriptionHistoryEntity])],
})
export class CompanySubscriptionHistoryModule {}
