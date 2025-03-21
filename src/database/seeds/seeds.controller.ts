import { Controller, Post } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { Roles, Role } from '../../auth/decorators/roles.decorator';

@Controller('admin/seeds')
export class SeedsController {
  constructor(private seedsService: SeedsService) {}

  /**
   * Executa todas as seeds
   * Acessível apenas para administradores
   */
  @Post('run')
  @Roles(Role.SUPER_ADMIN)
  async runAllSeeds() {
    return this.seedsService.runAllSeeds();
  }

  /**
   * Executa seed de usuários apenas
   * Acessível apenas para administradores
   */
  @Post('users')
  @Roles(Role.SUPER_ADMIN)
  async seedUsers() {
    return this.seedsService.seedUsers();
  }
}
