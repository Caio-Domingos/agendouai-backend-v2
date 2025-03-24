import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { SubmissionStatus } from './submissions.model';

export class SubmissionDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'ID do questionário deve ser um número inteiro' })
  questionnaireId: number;

  @IsDate({ message: 'Data de início deve ser uma data válida' })
  startedAt: Date;

  @IsOptional()
  @IsDate({ message: 'Data de conclusão deve ser uma data válida' })
  completedAt?: Date;

  @IsEnum(SubmissionStatus, {
    message: `Status deve ser um dos valores: ${Object.values(SubmissionStatus).join(', ')}`,
  })
  status: SubmissionStatus;
}

export class CreateSubmissionDTO {
  @IsNumber({}, { message: 'ID do questionário deve ser um número inteiro' })
  questionnaireId: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de início deve ser uma data válida' })
  startedAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de conclusão deve ser uma data válida' })
  completedAt?: Date;

  @IsOptional()
  @IsEnum(SubmissionStatus, {
    message: `Status deve ser um dos valores: ${Object.values(SubmissionStatus).join(', ')}`,
  })
  status?: SubmissionStatus;
}

export class UpdateSubmissionDTO extends PartialType(CreateSubmissionDTO) {}
