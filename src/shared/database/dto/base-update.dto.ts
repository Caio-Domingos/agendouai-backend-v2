import { IsOptional, IsUUID } from 'class-validator';

/**
 * Base class for Update DTOs - extend this for type safety
 */
export abstract class BaseUpdateDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  constructor(partial?: Partial<BaseUpdateDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
