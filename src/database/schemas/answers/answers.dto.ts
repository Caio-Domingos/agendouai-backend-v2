import { IsNumber, IsObject } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

export class AnswerDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'ID da submissão deve ser um número inteiro' })
  submissionId: number;

  @IsNumber(
    {},
    { message: 'ID da questão da página deve ser um número inteiro' },
  )
  pageQuestionId: number;

  @IsObject({ message: 'Valor deve ser um objeto JSON válido' })
  value: Record<string, any>;
}

export class CreateAnswerDTO {
  @IsNumber({}, { message: 'ID da submissão deve ser um número inteiro' })
  submissionId: number;

  @IsNumber(
    {},
    { message: 'ID da questão da página deve ser um número inteiro' },
  )
  pageQuestionId: number;

  @IsObject({ message: 'Valor deve ser um objeto JSON válido' })
  value: Record<string, any>;
}

export class UpdateAnswerDTO extends PartialType(CreateAnswerDTO) {}
