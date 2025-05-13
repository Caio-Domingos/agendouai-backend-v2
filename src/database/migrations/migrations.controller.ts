import { Controller, Post, Get } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from '../../shared/swagger/response-decorators';
import { ApiCommonResponses } from '../../shared/swagger/error-responses.decorator';
import {
  MigrationsRunResponseDto,
  MigrationSuccessDto,
  PendingMigrationsDto,
  MigrationHistoryDto,
} from './dto/migration-response.dto';

@ApiTags('_DB')
@Controller('admin/migrations')
@ApiBearerAuth('JWT')
export class MigrationsController {
  constructor(private migrationsService: MigrationsService) {}

  /**
   * Executa as migrations pendentes
   * Acessível para usuários autenticados
   */
  @Post('run')
  @ApiEndpoint({
    summary: 'Executar migrations pendentes',
    description: 'Executa as migrations pendentes no banco de dados',
    responseType: MigrationsRunResponseDto,
  })
  @ApiCommonResponses()
  async runMigrations() {
    return this.migrationsService.runMigrations();
  }

  /**
   * Reverte a última migration
   * Acessível para usuários autenticados
   */
  @Post('revert')
  @ApiEndpoint({
    summary: 'Reverter última migration',
    description: 'Reverte a última migration executada',
    responseType: MigrationSuccessDto,
  })
  @ApiCommonResponses()
  async revertLastMigration() {
    return this.migrationsService.revertLastMigration();
  }

  /**
   * Lista as migrations pendentes
   * Acessível para usuários autenticados
   */
  @Get('pending')
  @ApiEndpoint({
    summary: 'Listar migrations pendentes',
    description: 'Lista todas as migrations pendentes',
    responseType: PendingMigrationsDto,
  })
  @ApiCommonResponses()
  async getPendingMigrations() {
    return this.migrationsService.getPendingMigrations();
  }

  /**
   * Obtém o histórico de migrations executadas
   * Acessível para usuários autenticados
   */
  @Get('history')
  @ApiEndpoint({
    summary: 'Ver histórico de migrations',
    description: 'Obtém o histórico de migrations já executadas',
    responseType: MigrationHistoryDto,
  })
  @ApiCommonResponses()
  async getMigrationHistory() {
    return this.migrationsService.getMigrationHistory();
  }
}
