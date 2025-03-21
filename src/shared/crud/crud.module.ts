import { Module } from '@nestjs/common';
import { QueryOptionsPipe } from './pipes/query-options.pipe';

@Module({
  providers: [QueryOptionsPipe],
  exports: [QueryOptionsPipe],
})
export class CrudModule {}
