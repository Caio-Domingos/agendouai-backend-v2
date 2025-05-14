import { APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InterceptorsModule } from './shared/interceptors/interceptors.module';
import { MorganMiddleware } from './shared/interceptors/logging/morgan.middleware';
import { DatabaseModule } from './database/database.module';
import { HelloController } from './hello.controller';
import { UsersModule } from './modules/users/users.module';
import { UserModule } from './modules/user/user.module';
import { PeopleModule } from './modules/people/people.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CompanyCategoriesModule } from './modules/company-categories/company-categories.module';
import { PlansModule } from './modules/plans/plans.module';
import { CompanySubscriptionHistoryModule } from './modules/company-subscription-history/company-subscription-history.module';
import { SpacesModule } from './modules/spaces/spaces.module';
import { SpaceManagersModule } from './modules/space-managers/space-managers.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BookingStatusHistoryModule } from './modules/booking-status-history/booking-status-history.module';
import { AvailabilitiesModule } from './modules/availabilities/availabilities.module';

const FEATURE_MODULES = [
  UsersModule,
  UserModule,
  PeopleModule,
  CompaniesModule,
  CompanyCategoriesModule,
  PlansModule,
  CompanySubscriptionHistoryModule,
  SpacesModule,
  SpaceManagersModule,
  BookingsModule,
  BookingStatusHistoryModule,
  AvailabilitiesModule,
];

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    InterceptorsModule,
    ...FEATURE_MODULES,
  ],
  controllers: [HelloController],
  providers: [
    // Aplica o JwtAuthGuard globalmente - todas as rotas precisam de autenticação por padrão
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Removido o RolesGuard global
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplicar o Morgan middleware para todas as rotas
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
