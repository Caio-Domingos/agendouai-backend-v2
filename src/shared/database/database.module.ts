import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MigrationsModule } from '../../database/migrations/migrations.module';
import { SeedsModule } from '../../database/seeds/seeds.module';

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
          // Desabilitar synchronize em todos os ambientes
          // Usar somente em desenvolvimento para testes iniciais
          synchronize: false,
          logging: nodeEnv === 'development',
          autoLoadEntities: true,
          // Não executamos migrations automaticamente, isso será controlado pelo serviço de migrations
          migrationsRun: false,
        };
      },
    }),
    // Importa os módulos de migrations e seeds
    MigrationsModule,
    SeedsModule,
  ],
  exports: [MigrationsModule, SeedsModule],
})
export class DatabaseModule {}
