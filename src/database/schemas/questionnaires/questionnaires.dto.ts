import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

import { QuestionnaireStatus } from './questionnaires.model';

export class QuestionnaireDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'Título deve ser uma string' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  description?: string;

  @IsOptional()
  @IsEnum(QuestionnaireStatus, {
    message: `Status deve ser um dos valores: ${Object.values(QuestionnaireStatus).join(', ')}`,
  })
  status: QuestionnaireStatus;

  @IsNumber({}, { message: 'ID do criador deve ser um número inteiro' })
  createdBy: number;

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId?: number;
}

export class CreateQuestionnaireDTO {
  @IsString({ message: 'Título deve ser uma string' })
  @MaxLength(255, { message: 'Título deve ter no máximo 255 caracteres' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  description?: string;

  @IsOptional()
  @IsEnum(QuestionnaireStatus, {
    message: `Status deve ser um dos valores: ${Object.values(QuestionnaireStatus).join(', ')}`,
  })
  status?: QuestionnaireStatus;

  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId?: number;
}

export class UpdateQuestionnaireDTO extends PartialType(
  CreateQuestionnaireDTO,
) {}
