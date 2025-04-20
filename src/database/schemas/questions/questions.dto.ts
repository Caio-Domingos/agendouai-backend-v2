import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import slugify from 'slugify';
import { PartialType } from 'src/shared/validation/dto-helpers';

import { QuestionType } from './questions.model';

export class QuestionDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'Slug deve ser uma string' })
  slug: string;

  @IsString({ message: 'Título deve ser uma string' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  description?: string;

  @IsEnum(QuestionType, {
    message: `Tipo deve ser um dos valores: ${Object.values(QuestionType).join(', ')}`,
  })
  type: QuestionType;

  @IsObject({ message: 'Configuração deve ser um objeto JSON válido' })
  configuration: Record<string, any>;

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId?: number;
}

export class CreateQuestionDTO {
  // Transforma o title em slug
  @Transform(({ obj }) =>
    slugify(obj.title || `new-question-${Date.now()}`, { lower: true }),
  )
  @IsString({ message: 'Slug deve ser uma string' })
  @MaxLength(255, { message: 'Slug deve ter no máximo 255 caracteres' })
  slug: string;

  @IsString({ message: 'Título deve ser uma string' })
  @MaxLength(255, { message: 'Título deve ter no máximo 255 caracteres' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  description?: string;

  @IsEnum(QuestionType, {
    message: `Tipo deve ser um dos valores: ${Object.values(QuestionType).join(', ')}`,
  })
  type: QuestionType;

  @IsOptional()
  @IsObject({ message: 'Configuração deve ser um objeto JSON válido' })
  configuration?: Record<string, any>;

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId?: number;
}

export class UpdateQuestionDTO extends PartialType(CreateQuestionDTO) {}
