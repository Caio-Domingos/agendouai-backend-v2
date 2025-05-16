import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { SpaceStatus } from './spaces.model';
import { CreateAvailabilitiesDTO } from '../availabilities/availabilities.dto';
import { Transform, Type } from 'class-transformer';

export class SpacesDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsEnum(SpaceStatus, {
    message: `Status deve ser um dos valores: ${Object.values(SpaceStatus).join(', ')}`,
  })
  status: SpaceStatus;

  @IsBoolean({ message: 'Múltiplas reservas deve ser um valor booleano' })
  multipleBookings: boolean;

  @IsOptional()
  @IsString({ message: 'URL da foto deve ser uma string' })
  photoUrl?: string;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId: number;

  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsNumber({}, { message: 'ID do criador deve ser um número' })
  createdBy: number;

  @IsNumber({}, { message: 'ID do atualizador deve ser um número' })
  updatedBy: number;
}

export class CreateSpacesDTO {
  @IsOptional()
  @IsEnum(SpaceStatus, {
    message: `Status deve ser um dos valores: ${Object.values(SpaceStatus).join(', ')}`,
  })
  status: SpaceStatus;

  @IsOptional()
  @IsBoolean({ message: 'Múltiplas reservas deve ser um valor booleano' })
  multipleBookings?: boolean;

  @IsOptional()
  @IsString({ message: 'URL da foto deve ser uma string' })
  photoUrl?: string;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId: number;

  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsNumber({}, { message: 'ID do criador deve ser um número' })
  @Transform(({ value }) => undefined)
  createdBy: number;

  @Transform(({ value }) => undefined)
  @IsNumber({}, { message: 'ID do atualizador deve ser um número' })
  updatedBy: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateAvailabilitiesDTO)
  spaceAvailabilities?: CreateAvailabilitiesDTO[];
}

export class UpdateSpacesDTO extends PartialType(CreateSpacesDTO) {}
