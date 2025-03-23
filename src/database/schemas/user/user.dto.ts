import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { UserStatus } from './user.model';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
  @IsString()
  email: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;
}

// TODO: better validation
export class CreateUserDTO {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
