import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.cwd(),
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX,
  apiVersion: process.env.API_VERSION,
  appUrl: process.env.APP_URL,
  corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
  ],
}));
