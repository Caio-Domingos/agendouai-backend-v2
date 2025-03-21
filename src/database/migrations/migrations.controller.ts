import { Controller, Post, Get, HttpStatus } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles, Role } from '../../auth/decorators/roles.decorator';

@Controller('admin/migrations')
export class MigrationsController {
  constructor(private migrationsService: MigrationsService) {}

  /**
   * Executa as migrations pendentes
   * Acessível apenas para administradores
   */
  @Post('run')
  @Roles(Role.SUPER_ADMIN)
  async runMigrations() {
    return this.migrationsService.runMigrations();
  }

  /**
   * Reverte a última migration
   * Acessível apenas para administradores
   */
  @Post('revert')
  @Roles(Role.SUPER_ADMIN)
  async revertLastMigration() {
    return this.migrationsService.revertLastMigration();
  }

  /**
   * Lista as migrations pendentes
   * Acessível apenas para administradores
   */
  @Get('pending')
  @Roles(Role.SUPER_ADMIN)
  async getPendingMigrations() {
    return this.migrationsService.getPendingMigrations();
  }

  /**
   * Obtém o histórico de migrations executadas
   * Acessível apenas para administradores
   */
  @Get('history')
  @Roles(Role.SUPER_ADMIN)
  async getMigrationHistory() {
    return this.migrationsService.getMigrationHistory();
  }
}
