import { APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InterceptorsModule } from './shared/interceptors/interceptors.module';
import { MorganMiddleware } from './shared/interceptors/logging/morgan.middleware';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { QuestionnaireModule } from './modules/questionnaires/questionnaires.module';
import { PageModule } from './modules/pages/pages.module';
import { QuestionModule } from './modules/questions/questions.module';
import { PageQuestionModule } from './modules/page-question/page-question.module';
import { SubmissionModule } from './modules/submissions/submissions.module';
import { AnswerModule } from './modules/answers/answers.module';
import { AlertModule } from './modules/alerts/alerts.module';
import { CompanyModule } from './modules/companies/companies.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    InterceptorsModule,
    UserModule,
    QuestionnaireModule,
    PageModule,
    QuestionModule,
    PageQuestionModule,
    SubmissionModule,
    AnswerModule,
    AlertModule,
    CompanyModule,
  ],
  controllers: [],
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
