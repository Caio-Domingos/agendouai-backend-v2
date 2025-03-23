import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  MaxLength,
  IsPositive,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { UserResponseDto } from '../../../auth/dto/response.dto';
import { BaseDto } from './base.dto';
import { BaseCreateDto } from './base-create.dto';
import { PartialType } from '../../validation/dto-helpers';

// DTO para exibição
export class ProductDto extends BaseDto {
  @ApiProperty({ example: 'Smartphone XYZ', description: 'Nome do produto' })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'Smartphone com câmera de alta resolução...',
    description: 'Descrição do produto',
  })
  @Expose()
  description: string;

  @ApiProperty({ example: 1299.99, description: 'Preço do produto' })
  @Expose()
  price: number;

  @ApiProperty({ example: 50, description: 'Quantidade em estoque' })
  @Expose()
  stock: number;

  @ApiProperty({ example: true, description: 'Indica se o produto está ativo' })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    example: 'PROD-12345',
    description: 'Código único do produto (SKU)',
  })
  @Expose()
  sku: string;

  @ApiProperty({
    type: () => UserResponseDto,
    description: 'Criador do produto',
  })
  @Expose()
  creator: UserResponseDto;

  @Exclude()
  creatorId: string;

  constructor(partial: Partial<ProductDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}

// DTO para criação
export class CreateProductDto extends BaseCreateDto {
  @ApiProperty({ example: 'Smartphone XYZ', description: 'Nome do produto' })
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(100, { message: 'O nome não pode ter mais de 100 caracteres' })
  name: string;

  @ApiProperty({
    example:
      'Smartphone com câmera de alta resolução e bateria de longa duração',
    description: 'Descrição detalhada do produto',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  description?: string;

  @ApiProperty({ example: 1299.99, description: 'Preço do produto' })
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsPositive({ message: 'O preço deve ser positivo' })
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 50, description: 'Quantidade em estoque' })
  @IsNotEmpty({ message: 'O estoque é obrigatório' })
  @IsNumber({}, { message: 'O estoque deve ser um número' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  @Type(() => Number)
  stock: number;

  @ApiProperty({ example: true, description: 'Indica se o produto está ativo' })
  @IsOptional()
  @IsBoolean({ message: 'isActive deve ser um valor booleano' })
  isActive?: boolean;

  @ApiProperty({
    example: 'PROD-12345',
    description: 'Código único do produto (SKU)',
  })
  @IsNotEmpty({ message: 'O SKU é obrigatório' })
  @IsString({ message: 'O SKU deve ser uma string' })
  sku: string;

  @ApiProperty({ example: '1', description: 'ID do criador do produto' })
  @IsNotEmpty({ message: 'O ID do criador é obrigatório' })
  @IsString({ message: 'O ID do criador deve ser uma string' })
  creatorId: string;
}

// DTO para atualização - estende o DTO de criação tornando todos os campos opcionais
export class UpdateProductDto extends PartialType(CreateProductDto) {}
