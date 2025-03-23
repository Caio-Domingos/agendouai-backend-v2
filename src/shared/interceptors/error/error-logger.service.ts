import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const appendFileAsync = promisify(fs.appendFile);
const mkdirAsync = promisify(fs.mkdir);

export interface ErrorLogEntry {
  timestamp: Date;
  path: string;
  statusCode: number;
  message: string;
  exception: Error;
  request: {
    method: string;
    url: string;
    ip: string;
    headers: any;
    user?: any;
  };
}

@Injectable()
export class ErrorLoggerService {
  private readonly logger = new Logger(ErrorLoggerService.name);
  private readonly logDir = path.join(process.cwd(), 'logs');
  private readonly errorLogPath = path.join(this.logDir, 'errors.log');

  constructor() {
    this.initLogDir();
  }

  private async initLogDir() {
    try {
      if (!fs.existsSync(this.logDir)) {
        await mkdirAsync(this.logDir, { recursive: true });
        this.logger.log(`Diretório de logs criado em: ${this.logDir}`);
      }
    } catch (error) {
      this.logger.error(`Erro ao criar diretório de logs: ${error.message}`);
    }
  }

  async logError(entry: ErrorLogEntry): Promise<void> {
    try {
      // Formatar o log para ser mais legível
      const logEntry = {
        timestamp: entry.timestamp.toISOString(),
        path: entry.path,
        statusCode: entry.statusCode,
        message: entry.message,
        method: entry.request.method,
        url: entry.request.url,
        ip: entry.request.ip,
        user: entry.request.user
          ? {
              id: entry.request.user.id,
              email: entry.request.user.email,
            }
          : null,
        stack: entry.exception.stack,
      };

      const logString = JSON.stringify(logEntry, null, 0) + '\n';
      await appendFileAsync(this.errorLogPath, logString);
    } catch (error) {
      this.logger.error(`Erro ao salvar log de erro: ${error.message}`);
      this.logger.error(error);
    }
  }
}
