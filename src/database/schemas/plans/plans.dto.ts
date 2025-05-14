import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

export class PlansDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  description?: string;

  @IsNumber({}, { message: 'Preço deve ser um número' })
  price: number;

  @IsString({ message: 'Intervalo deve ser uma string' })
  @MaxLength(20, { message: 'Intervalo deve ter no máximo 20 caracteres' })
  interval: string;

  @IsOptional()
  @IsObject({ message: 'Features deve ser um objeto JSON' })
  features?: object;

  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser um valor booleano' })
  active?: boolean;

  @IsOptional()
  @IsString({ message: 'ID do plano Stripe deve ser uma string' })
  @MaxLength(100, {
    message: 'ID do plano Stripe deve ter no máximo 100 caracteres',
  })
  stripePlanId?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}

export class CreatePlansDTO {
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  description?: string;

  @IsNumber({}, { message: 'Preço deve ser um número' })
  price: number;

  @IsString({ message: 'Intervalo deve ser uma string' })
  @MaxLength(20, { message: 'Intervalo deve ter no máximo 20 caracteres' })
  interval: string;

  @IsOptional()
  @IsObject({ message: 'Features deve ser um objeto JSON' })
  features?: object;

  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser um valor booleano' })
  active?: boolean;

  @IsOptional()
  @IsString({ message: 'ID do plano Stripe deve ser uma string' })
  @MaxLength(100, {
    message: 'ID do plano Stripe deve ter no máximo 100 caracteres',
  })
  stripePlanId?: string;
}

export class UpdatePlansDTO extends PartialType(CreatePlansDTO) {}
