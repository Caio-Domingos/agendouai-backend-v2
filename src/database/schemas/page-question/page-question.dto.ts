import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { AlertCompType } from './page-question.model';
import { Expose, Transform, Type } from 'class-transformer';

export class AlertDto {
  @IsEnum(AlertCompType, { message: 'Comparador inválido' })
  comp: AlertCompType;

  @Expose()
  valueExpected: string | number | boolean | Date | null;
}

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
  @ValidateNested({ each: true })
  @Type(() => AlertDto)
  alerts: AlertDto[];
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
  @ValidateNested({ each: true })
  @Type(() => AlertDto)
  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return [];
    }
    return value;
  })
  alerts?: AlertDto[];
}

export class UpdatePageQuestionDTO extends PartialType(CreatePageQuestionDTO) {
  @IsOptional()
  @IsArray({ message: 'Alertas deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => AlertDto)
  alerts?: AlertDto[];
}
