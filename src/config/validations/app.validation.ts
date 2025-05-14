import * as Joi from 'joi';

export const appValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('v1'),
  APP_NAME: Joi.string().default('Agendou Ai?'),
  APP_URL: Joi.string().default('http://localhost:3000'),
  CORS_ALLOWED_ORIGINS: Joi.string().default('http://localhost:3000'),
});
