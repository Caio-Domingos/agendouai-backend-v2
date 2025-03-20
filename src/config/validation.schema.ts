import * as Joi from 'joi';
import { appValidationSchema } from './validations/app.validation';
import { databaseValidationSchema } from './validations/database.validation';
import { authValidationSchema } from './validations/auth.validation';

/**
 * Schema de validação combinado para todas as variáveis de ambiente
 * Cada domínio tem seu próprio schema em um arquivo separado para melhor organização
 */
export const validationSchema = Joi.object({
  ...appValidationSchema.keys(),
  ...databaseValidationSchema.keys(),
  ...authValidationSchema.keys(),
});
