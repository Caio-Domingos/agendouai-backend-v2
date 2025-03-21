import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseCleanService {
  private readonly logger = new Logger(DatabaseCleanService.name);

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  /**
   * Limpa todas as tabelas do banco de dados, exceto a tabela de migrations
   * para preservar o histórico de alterações estruturais
   */
  async cleanDatabase(): Promise<{ success: boolean; message: string }> {
    this.logger.warn('Iniciando limpeza completa do banco de dados...');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Desativar verificação de chaves estrangeiras temporariamente
      this.logger.log('Desativando verificação de chaves estrangeiras...');
      await queryRunner.query('SET CONSTRAINTS ALL DEFERRED');

      // Obter todas as tabelas exceto a de migrations
      const tables = await this.getTablesExceptMigrations(queryRunner);
      this.logger.log(`Tabelas encontradas: ${tables.join(', ')}`);

      // Truncar todas as tabelas em uma única transação
      for (const table of tables) {
        this.logger.log(`Truncando tabela: ${table}`);
        await queryRunner.query(`TRUNCATE TABLE "${table}" CASCADE`);
      }

      // Reativar verificação de chaves estrangeiras
      this.logger.log('Reativando verificação de chaves estrangeiras...');
      await queryRunner.query('SET CONSTRAINTS ALL IMMEDIATE');

      await queryRunner.commitTransaction();

      this.logger.log('Limpeza do banco de dados concluída com sucesso!');
      return {
        success: true,
        message: `${tables.length} tabelas foram limpadas com sucesso.`,
      };
    } catch (error) {
      this.logger.error('Erro ao limpar o banco de dados', error.stack);
      await queryRunner.rollbackTransaction();

      return {
        success: false,
        message: `Erro ao limpar o banco de dados: ${error.message}`,
      };
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Obtém todas as tabelas do banco de dados, exceto a tabela de migrations
   */
  private async getTablesExceptMigrations(queryRunner: any): Promise<string[]> {
    const result = await queryRunner.query(`
      SELECT tablename FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public' AND tablename != 'migrations'
    `);

    return result.map((row) => row.tablename);
  }

  /**
   * Reinicia os contadores de sequência (IDs) para todas as tabelas
   * Isso garante que os IDs comecem de 1 novamente após a limpeza
   */
  private async resetSequences(queryRunner: any): Promise<void> {
    const sequences = await queryRunner.query(`
      SELECT sequence_name FROM information_schema.sequences 
      WHERE sequence_schema = 'public'
    `);

    for (const seq of sequences) {
      const sequenceName = seq.sequence_name;
      this.logger.log(`Reiniciando sequência: ${sequenceName}`);
      await queryRunner.query(
        `ALTER SEQUENCE "${sequenceName}" RESTART WITH 1`,
      );
    }
  }
}
