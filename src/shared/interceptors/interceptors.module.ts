import { Module, Global } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './response/transform-response.interceptor';
import { AllExceptionsFilter } from './error/http-exception.filter';
import { ErrorLoggerService } from './error/error-logger.service';
import { TransactionInterceptor } from './transaction/transaction.interceptor';
import { TransactionService } from './transaction/transaction.service';

@Global()
@Module({
  providers: [
    ErrorLoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    TransactionInterceptor,
    TransactionService,
  ],
  exports: [TransactionInterceptor, ErrorLoggerService, TransactionService],
})
export class InterceptorsModule {}
