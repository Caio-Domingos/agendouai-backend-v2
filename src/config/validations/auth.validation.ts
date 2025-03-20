import * as Joi from 'joi';

export const authValidationSchema = Joi.object({
  // JWT básico
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.number().default(3600),
  JWT_REFRESH_EXPIRATION_TIME: Joi.number().default(86400),

  // Segurança
  BCRYPT_SALT_ROUNDS: Joi.number().default(10),
  ENABLE_TWO_FACTOR_AUTH: Joi.boolean().default(false),
  MAX_LOGIN_ATTEMPTS: Joi.number().default(5),

  // Passport
  DEFAULT_AUTH_STRATEGY: Joi.string().default('jwt'),
  AUTH_SESSION: Joi.boolean().default(false),

  // Cookies
  COOKIE_MAX_AGE: Joi.number().default(86400000), // 24 horas em ms
});
