import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
  IsNumber,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from 'src/database/schemas/user/user.model';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João',
  })
  @IsNotEmpty({ message: 'O Nome é obrigatório' })
  @IsString({ message: 'O Nome deve ser uma string' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
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
    description: 'Papel do usuário',
    example: 'ADMIN',
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message: `Papel deve ser um dos valores: ${Object.values(UserRole).join(', ')}`,
  })
  @Transform(({ value }) => (value !== undefined ? value : UserRole.EMPLOYEE))
  role: UserRole;

  @ValidateIf((o) => o.role !== UserRole.ADMIN)
  @IsNumber(
    {},
    {
      message: 'ID da empresa é obrigatório para usuários não-administradores',
    },
  )
  companyId?: number;

  @IsOptional()
  @IsEnum(UserStatus, {
    message: `Status deve ser um dos valores: ${Object.values(UserStatus).join(', ')}`,
  })
  @Transform(({ value }) => (value !== undefined ? value : UserStatus.ACTIVE))
  status?: UserStatus;
}
