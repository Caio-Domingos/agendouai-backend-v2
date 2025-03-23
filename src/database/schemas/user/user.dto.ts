import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PartialType } from 'src/shared/validation/dto-helpers';
import { UserStatus } from './user.model';

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
  status: UserStatus;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
