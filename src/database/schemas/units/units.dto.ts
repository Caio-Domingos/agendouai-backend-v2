import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { UnitStatus } from './units.model';

export class UnitDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsEnum(UnitStatus, {
    message: `Status deve ser um dos valores: ${Object.values(UnitStatus).join(', ')}`,
  })
  status: UnitStatus;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;
}

export class CreateUnitDTO {
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsOptional()
  @IsEnum(UnitStatus, {
    message: `Status deve ser um dos valores: ${Object.values(UnitStatus).join(', ')}`,
  })
  status?: UnitStatus;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;
}

export class UpdateUnitDTO extends PartialType(CreateUnitDTO) {}
