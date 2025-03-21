import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { InterceptorsModule } from './shared/interceptors/interceptors.module';
import { MorganMiddleware } from './shared/interceptors/logging/morgan.middleware';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    InterceptorsModule, // Novo módulo para interceptores
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Aplica o JwtAuthGuard globalmente - todas as rotas precisam de autenticação por padrão
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Aplica o RolesGuard globalmente - verifica papéis quando decoradores @Roles são usados
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplicar o Morgan middleware para todas as rotas
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
