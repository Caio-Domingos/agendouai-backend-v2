import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

export class PageDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'ID do questionário deve ser um número inteiro' })
  questionnaireId: number;

  @IsString({ message: 'Título deve ser uma string' })
  title: string;

  @IsNumber({}, { message: 'Número de sequência deve ser um número inteiro' })
  sequenceNumber: number;

  @IsBoolean({ message: 'Campo de página de identificação deve ser booleano' })
  isIdentificationPage: boolean;
}

export class CreatePageDTO {
  @IsNumber({}, { message: 'ID do questionário deve ser um número inteiro' })
  questionnaireId: number;

  @IsString({ message: 'Título deve ser uma string' })
  @MaxLength(255, { message: 'Título deve ter no máximo 255 caracteres' })
  title: string;

  @IsNumber({}, { message: 'Número de sequência deve ser um número inteiro' })
  sequenceNumber: number;

  @IsOptional()
  @IsBoolean({ message: 'Campo de página de identificação deve ser booleano' })
  isIdentificationPage?: boolean;
}

export class UpdatePageDTO extends PartialType(CreatePageDTO) {}
