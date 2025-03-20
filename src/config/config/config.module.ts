import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import { validationSchema } from './validation.schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env.local', '.env'],
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
      expandVariables: true,
      cache: true,
    }),
  ],
})
export class ConfigModule {}
