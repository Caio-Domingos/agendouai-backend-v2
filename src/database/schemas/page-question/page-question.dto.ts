import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

export class PageQuestionDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'ID da página deve ser um número inteiro' })
  pageId: number;

  @IsNumber({}, { message: 'ID da questão deve ser um número inteiro' })
  questionId: number;

  @IsNumber({}, { message: 'Prioridade deve ser um número inteiro' })
  priority: number;

  @IsBoolean({ message: 'Campo obrigatório deve ser um booleano' })
  required: boolean;

  @IsObject({ message: 'Configuração deve ser um objeto JSON válido' })
  configuration: Record<string, any>;

  @IsArray({ message: 'Alertas deve ser um array' })
  alerts: Array<any>;
}

export class CreatePageQuestionDTO {
  @IsNumber({}, { message: 'ID da página deve ser um número inteiro' })
  pageId: number;

  @IsNumber({}, { message: 'ID da questão deve ser um número inteiro' })
  questionId: number;

  @IsNumber({}, { message: 'Prioridade deve ser um número inteiro' })
  priority: number;

  @IsOptional()
  @IsBoolean({ message: 'Campo obrigatório deve ser um booleano' })
  required?: boolean;

  @IsOptional()
  @IsObject({ message: 'Configuração deve ser um objeto JSON válido' })
  configuration?: Record<string, any>;

  @IsOptional()
  @IsArray({ message: 'Alertas deve ser um array' })
  alerts?: Array<any>;
}

export class UpdatePageQuestionDTO extends PartialType(CreatePageQuestionDTO) {}
