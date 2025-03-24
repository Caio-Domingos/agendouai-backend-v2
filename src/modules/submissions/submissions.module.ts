import { Module } from '@nestjs/common';
import { SubmissionService } from './submissions.service';
import { SubmissionController } from './submissions.controller';
import { SubmissionRepository } from 'src/database/schemas/submissions/submissions.repository';

@Module({
  exports: [SubmissionService],
  controllers: [SubmissionController],
  providers: [SubmissionService, SubmissionRepository],
})
export class SubmissionModule {}
