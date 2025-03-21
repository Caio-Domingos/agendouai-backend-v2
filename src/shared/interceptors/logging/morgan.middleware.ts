import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import * as chalk from 'chalk';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  constructor() {
    morgan.token('color-status', (req: Request, res: Response) => {
      const status = res.statusCode;
      let color = chalk.green;

      if (status >= 400 && status < 500) {
        color = chalk.yellow;
      } else if (status >= 500) {
        color = chalk.red;
      }

      return color(status.toString());
    });

    morgan.token('truncated-url', (req: Request) => {
      // Truncar a URL para não mostrar parâmetros de consulta muito longos
      const url = req.originalUrl || req.url;
      const queryIndex = url.indexOf('?');

      if (queryIndex !== -1 && url.length > 100) {
        return `${url.substring(0, queryIndex)}?[params omitted]`;
      }

      return url;
    });

    morgan.token('remote-user', (req: Request) => {
      const user = (req as any).user;
      if (user) {
        return `${user.email}(${user.id})`;
      }
      return 'anonymous';
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Formato personalizado para logs mais úteis e legíveis
    const format =
      ':method :truncated-url :color-status :response-time ms - :res[content-length] - :remote-user';

    morgan(format, {
      stream: {
        write: (message: string) => {
          this.logger.log(message.trim());
        },
      },
    })(req, res, next);
  }
}
