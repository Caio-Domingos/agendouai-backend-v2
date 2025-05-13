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
          schema: configService.get('database.schema') || 'public',

          synchronize: nodeEnv === 'development',
          logging: nodeEnv === 'development',
          // autoLoadEntities: true, // TODO: This is more safe than entities, but more annoying to use

          migrationsRun: false,

          // Configuração otimizada com melhor gerenciamento de conexões
          poolSize: 15, // Reduzido para evitar muitas conexões simultâneas
          connectTimeoutMS: 30000,
          retryAttempts: 3, // Equilibrado
          retryDelay: 1000,
          extra: {
            max: 15, // Reduzido para evitar muitas conexões
            min: 1, // Menor número de conexões mínimas
            idleTimeoutMillis: 30000, // 1 minuto para fechar conexões ociosas
            connectionTimeoutMillis: 30000, // Tempo menor para timeout
            query_timeout: 30000,
            maxUses: 1500, // Número máximo de queries por conexão
            keepAlive: true,
            keepAliveInitialDelayMillis: 30000,
            application_name: 'botflex-prod-rd',
            allowExitOnIdle: true, // Importante: sinalizar para fechar conexões idle em caso de shutdown
            log: (msg, err) => {
              if (err) console.error('Database pool error:', err);
              // Logging detalhado para todas as conexões
            },
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
