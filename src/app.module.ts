import { APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InterceptorsModule } from './shared/interceptors/interceptors.module';
import { MorganMiddleware } from './shared/interceptors/logging/morgan.middleware';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { HelloController } from './hello.controller';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    InterceptorsModule,
    UserModule,
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
