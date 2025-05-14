import { IsNumber, IsOptional, IsDate } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';

export class SpaceManagersDto {
  @IsNumber({}, { message: 'ID deve ser um número inteiro' })
  id: number;

  @IsNumber({}, { message: 'ID do espaço deve ser um número inteiro' })
  spaceId: number;

  @IsNumber({}, { message: 'ID do usuário deve ser um número inteiro' })
  userId: number;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;

  @IsOptional()
  @IsDate({ message: 'Data de criação deve ser uma data válida' })
  createdAt?: Date;

  @IsOptional()
  @IsDate({ message: 'Data de atualização deve ser uma data válida' })
  updatedAt?: Date;
}

export class CreateSpaceManagersDTO {
  @IsNumber({}, { message: 'ID do espaço deve ser um número inteiro' })
  spaceId: number;

  @IsNumber({}, { message: 'ID do usuário deve ser um número inteiro' })
  userId: number;

  @IsNumber({}, { message: 'ID da empresa deve ser um número inteiro' })
  companyId: number;
}

export class UpdateSpaceManagersDTO extends PartialType(
  CreateSpaceManagersDTO,
) {}
