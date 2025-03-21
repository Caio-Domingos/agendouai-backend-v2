import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class MigrationsService {
  private readonly logger = new Logger(MigrationsService.name);

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  /**
   * Executa as migrations pendentes
   */
  async runMigrations() {
    this.logger.log('Executando migrations pendentes...');

    const migrations = await this.dataSource.runMigrations();

    if (migrations.length > 0) {
      this.logger.log(
        `${migrations.length} migrations executadas com sucesso.`,
      );
      migrations.forEach((migration) => {
        this.logger.log(`- ${migration.name}`);
      });
      return { success: true, count: migrations.length, migrations };
    } else {
      this.logger.log('Nenhuma migration pendente para executar.');
      return { success: true, count: 0, migrations: [] };
    }
  }

  /**
   * Reverte a última migration executada
   */
  async revertLastMigration() {
    this.logger.log('Revertendo última migration...');

    await this.dataSource.undoLastMigration();

    this.logger.log('Última migration revertida com sucesso.');
    return { success: true };
  }

  /**
   * Lista as migrations pendentes
   */
  async getPendingMigrations() {
    const pendingMigrations = await this.dataSource.showMigrations();
    return { pendingMigrations };
  }

  /**
   * Obtém o histórico de migrations executadas
   */
  async getMigrationHistory() {
    const history = await this.dataSource.query(
      'SELECT * FROM migrations ORDER BY id DESC',
    );
    return { history };
  }
}
