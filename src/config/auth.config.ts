import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  // Configurações JWT básicas
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: parseInt(process.env.JWT_EXPIRATION_TIME || '3600', 10),
    refreshExpirationTime: parseInt(
      process.env.JWT_REFRESH_EXPIRATION_TIME || '86400',
      10,
    ),
  },

  // Opções de segurança adicionais
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
    enableTwoFactorAuth: process.env.ENABLE_TWO_FACTOR_AUTH === 'true',
    maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10),
  },

  // Configurações do Passport
  passport: {
    defaultStrategy: process.env.DEFAULT_AUTH_STRATEGY || 'jwt',
    session: process.env.AUTH_SESSION === 'true',
  },

  // Configurações de cookies (opcional, para armazenamento de tokens)
  cookies: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE || '86400000', 10), // 24 horas em ms
  },
}));
