import { Controller, Post } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { Roles, Role } from '../../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from '../../shared/swagger/response-decorators';
import { ApiCommonResponses } from '../../shared/swagger/error-responses.decorator';
import { SeedSuccessDto } from './dto/seed-response.dto';
import { DatabaseCleanService } from '../clean/database-clean.service';

@ApiTags('admin')
@Controller('admin/seeds')
@ApiBearerAuth('JWT')
export class SeedsController {
  constructor(
    private seedsService: SeedsService,
    private databaseCleanService: DatabaseCleanService,
  ) {}

  /**
   * Executa todas as seeds
   * Acessível apenas para administradores
   */
  @Post('run')
  @Roles(Role.SUPER_ADMIN)
  @ApiEndpoint({
    summary: 'Executar todas as seeds',
    description:
      'Executa todas as seeds para popular o banco com dados iniciais',
    responseType: SeedSuccessDto,
  })
  @ApiCommonResponses()
  async runAllSeeds() {
    return this.seedsService.runAllSeeds();
  }

  /**
   * Executa seed de usuários apenas
   * Acessível apenas para administradores
   */
  @Post('users')
  @Roles(Role.SUPER_ADMIN)
  @ApiEndpoint({
    summary: 'Executar seed de usuários',
    description: 'Cria usuários de exemplo no banco de dados',
    responseType: SeedSuccessDto,
  })
  @ApiCommonResponses()
  async seedUsers() {
    return this.seedsService.seedUsers();
  }

  /**
   * Limpa todos os dados do banco, exceto migrations
   * Acessível apenas para administradores
   */
  @Post('clear')
  @Roles(Role.SUPER_ADMIN)
  @ApiEndpoint({
    summary: 'Limpar banco de dados',
    description:
      'Remove todos os registros de todas as tabelas (CUIDADO: operação destrutiva)',
    responseType: SeedSuccessDto,
  })
  @ApiCommonResponses()
  async clearDatabase() {
    return this.databaseCleanService.cleanDatabase();
  }
}
