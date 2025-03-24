import { Module } from '@nestjs/common';
import { PageService } from './pages.service';
import { PageController } from './pages.controller';
import { PageRepository } from 'src/database/schemas/pages/pages.repository';

@Module({
  exports: [PageService],
  controllers: [PageController],
  providers: [PageService, PageRepository],
})
export class PageModule {}
