import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
  IsNumber,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  UserStatus,
  UserPermission,
} from 'src/database/schemas/users/users.model';

export class RegisterDto {
  // USER FIELDS
  @ApiProperty({
    description: 'Email do usuário (também será o username)',
    example: 'joao.silva@exemplo.com',
  })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  email: string;

  @ApiProperty({
    description:
      'Senha do usuário (deve conter maiúsculas, minúsculas e números)',
    example: 'Senha123',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,}$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
  })
  password: string;

  @ApiProperty({
    description: 'Permissão do usuário',
    enum: UserPermission,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserPermission, {
    message: `Permissão deve ser um dos valores: ${Object.values(UserPermission).join(', ')}`,
  })
  permission?: UserPermission;

  @ApiProperty({
    description: 'Status do usuário',
    enum: UserStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserStatus, {
    message: `Status deve ser um dos valores: ${Object.values(UserStatus).join(', ')}`,
  })
  @Transform(({ value }) => (value !== undefined ? value : UserStatus.ACTIVE))
  status?: UserStatus;

  @ApiProperty({ description: 'ID da empresa', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  companyId?: number;

  // PERSON FIELDS
  @ApiProperty({ description: 'Nome da pessoa', example: 'João' })
  @IsNotEmpty({ message: 'O Nome é obrigatório' })
  @IsString({ message: 'O Nome deve ser uma string' })
  @MaxLength(200)
  name: string;

  @ApiProperty({ description: 'CPF', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  cpf?: string;

  @ApiProperty({ description: 'Telefone', example: '+5511999999999' })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @ApiProperty({ description: 'CEP', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cep?: string;

  @ApiProperty({ description: 'URL da foto', required: false })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({ description: 'Cidade', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiProperty({ description: 'Estado', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  state?: string;

  @ApiProperty({ description: 'País', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  country?: string;

  @ApiProperty({ description: 'Endereço', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @ApiProperty({ description: 'Número do endereço', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  addressNumber?: string;

  @ApiProperty({
    description: 'Data de nascimento',
    required: false,
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  birthDate?: Date;
}
