import { IsString, IsOptional, MaxLength, IsNumber } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

export class CompanyCategoriesDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'Descrição deve ser uma string' })
  @MaxLength(100, { message: 'Descrição deve ter no máximo 100 caracteres' })
  description: string;

  @IsOptional()
  @IsString({ message: 'Prefixo de partição deve ser uma string' })
  @MaxLength(20, {
    message: 'Prefixo de partição deve ter no máximo 20 caracteres',
  })
  partitionPrefix?: string;
}

export class CreateCompanyCategoriesDTO {
  @IsString({ message: 'Descrição deve ser uma string' })
  @MaxLength(100, { message: 'Descrição deve ter no máximo 100 caracteres' })
  description: string;

  @IsOptional()
  @IsString({ message: 'Prefixo de partição deve ser uma string' })
  @MaxLength(20, {
    message: 'Prefixo de partição deve ter no máximo 20 caracteres',
  })
  partitionPrefix?: string;
}

export class UpdateCompanyCategoriesDTO extends PartialType(
  CreateCompanyCategoriesDTO,
) {}
