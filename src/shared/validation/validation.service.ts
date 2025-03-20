import { Injectable } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationService {
  /**
   * Valida manualmente um objeto com base em uma classe DTO
   * Útil para validações fora do ciclo de request/response
   */
  async validateDto<T extends object, V>(
    dto: new () => T,
    obj: V,
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const dtoObj = plainToInstance(dto, obj);
    const errors = await validate(dtoObj as object);

    if (errors.length > 0) {
      const messages = this.formatErrors(errors);
      return { isValid: false, errors: messages };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * Formata erros de validação em um array de mensagens legíveis
   */
  private formatErrors(errors: ValidationError[]): string[] {
    const result: string[] = [];
    errors.forEach((error) => {
      if (error.constraints) {
        // Iteração direta sobre os valores do objeto constraints
        for (const key in error.constraints) {
          if (Object.prototype.hasOwnProperty.call(error.constraints, key)) {
            result.push(error.constraints[key]);
          }
        }
      }
      if (error.children && error.children.length > 0) {
        result.push(...this.formatErrors(error.children));
      }
    });
    return result;
  }
}
