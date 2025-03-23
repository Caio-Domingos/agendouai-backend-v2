import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MigrationsModule } from './migrations/migrations.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get('app.nodeEnv');
        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],

          synchronize: nodeEnv === 'development',
          logging: nodeEnv === 'development',
          // autoLoadEntities: true, // TODO: This is more safe than entities, but more annoying to use

          migrationsRun: false,

          poolSize: 10,
          connectTimeoutMS: 30000,
          extra: {
            max: 10,
            min: 2,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 30000,
            query_timeout: 30000,
            maxUses: 5000,
            keepAlive: true,
            keepAliveInitialDelayMillis: 10000,
            statement_timeout: 30000,
          },
        };
      },
    }),

    MigrationsModule,
    SeedsModule,
  ],
  exports: [MigrationsModule, SeedsModule],
})
export class DatabaseModule {}
