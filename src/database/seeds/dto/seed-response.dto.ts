import { ApiProperty } from '@nestjs/swagger';

export class SeedSuccessDto {
  @ApiProperty({ example: true })
  success: boolean;
}
