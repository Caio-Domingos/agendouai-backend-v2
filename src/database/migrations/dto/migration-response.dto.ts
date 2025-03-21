import { ApiProperty } from '@nestjs/swagger';

export class MigrationDto {
  @ApiProperty({ example: 'CreateUsersTable1690000000000' })
  name: string;

  @ApiProperty({ example: 1690000000000 })
  timestamp: number;
}

export class MigrationsRunResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 2 })
  count: number;

  @ApiProperty({ type: [MigrationDto] })
  migrations: MigrationDto[];
}

export class MigrationSuccessDto {
  @ApiProperty({ example: true })
  success: boolean;
}

export class PendingMigrationsDto {
  @ApiProperty({ example: true })
  pendingMigrations: boolean;
}

export class MigrationHistoryDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        timestamp: { type: 'number', example: 1690000000000 },
        name: { type: 'string', example: 'CreateUsersTable1690000000000' },
      },
    },
  })
  history: any[];
}
