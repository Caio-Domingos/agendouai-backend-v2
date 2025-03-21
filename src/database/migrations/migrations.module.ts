import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MigrationsService } from './migrations.service';
import { MigrationsController } from './migrations.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        // Atualizado o caminho das migrations
        migrations: [__dirname + '/files/**/*{.ts,.js}'],
        migrationsTableName: 'migrations',
        migrationsRun: false, // Executa manualmente para controle
      }),
    }),
  ],
  providers: [MigrationsService],
  controllers: [MigrationsController],
  exports: [MigrationsService],
})
export class MigrationsModule {}
