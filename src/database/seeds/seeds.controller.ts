import { Controller, Post } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from '../../shared/swagger/response-decorators';
import { ApiCommonResponses } from '../../shared/swagger/error-responses.decorator';
import { SeedSuccessDto } from './dto/seed-response.dto';
import { DatabaseCleanService } from '../clean/database-clean.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@ApiTags('_DB')
@Controller('admin/seeds')
@ApiBearerAuth('JWT')
export class SeedsController {
  constructor(
    private seedsService: SeedsService,
    private databaseCleanService: DatabaseCleanService,
  ) {}

  /**
   * Executa todas as seeds
   * Acessível para usuários autenticados
   */
  @Post('run')
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
   * Acessível para usuários autenticados
   */
  @Post('users')
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
   * Acessível para usuários autenticados
   */
  @Post('clear')
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
