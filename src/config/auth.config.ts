import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: parseInt(process.env.JWT_EXPIRATION_TIME || '3600', 10),
}));
