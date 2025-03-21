import { Controller, Post, Get } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { Roles, Role } from '../../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from '../../shared/swagger/response-decorators';
import { ApiCommonResponses } from '../../shared/swagger/error-responses.decorator';
import {
  MigrationsRunResponseDto,
  MigrationSuccessDto,
  PendingMigrationsDto,
  MigrationHistoryDto,
} from './dto/migration-response.dto';

@ApiTags('admin')
@Controller('admin/migrations')
@ApiBearerAuth('JWT')
export class MigrationsController {
  constructor(private migrationsService: MigrationsService) {}

  /**
   * Executa as migrations pendentes
   * Acessível apenas para administradores
   */
  @Post('run')
  @Roles(Role.SUPER_ADMIN)
  @ApiEndpoint({
    summary: 'Executar migrations pendentes',
    description: 'Requer papel SUPER_ADMIN',
    responseType: MigrationsRunResponseDto,
  })
  @ApiCommonResponses()
  async runMigrations() {
    return this.migrationsService.runMigrations();
  }

  /**
   * Reverte a última migration
   * Acessível apenas para administradores
   */
  @Post('revert')
  @Roles(Role.SUPER_ADMIN)
  @ApiEndpoint({
    summary: 'Reverter última migration',
    description: 'Requer papel SUPER_ADMIN',
    responseType: MigrationSuccessDto,
  })
  @ApiCommonResponses()
  async revertLastMigration() {
    return this.migrationsService.revertLastMigration();
  }

  /**
   * Lista as migrations pendentes
   * Acessível apenas para administradores
   */
  @Get('pending')
  @Roles(Role.SUPER_ADMIN)
  @ApiEndpoint({
    summary: 'Listar migrations pendentes',
    description: 'Requer papel SUPER_ADMIN',
    responseType: PendingMigrationsDto,
  })
  @ApiCommonResponses()
  async getPendingMigrations() {
    return this.migrationsService.getPendingMigrations();
  }

  /**
   * Obtém o histórico de migrations executadas
   * Acessível apenas para administradores
   */
  @Get('history')
  @Roles(Role.SUPER_ADMIN)
  @ApiEndpoint({
    summary: 'Ver histórico de migrations',
    description: 'Requer papel SUPER_ADMIN',
    responseType: MigrationHistoryDto,
  })
  @ApiCommonResponses()
  async getMigrationHistory() {
    return this.migrationsService.getMigrationHistory();
  }
}
