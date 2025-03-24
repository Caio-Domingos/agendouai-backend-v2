import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { SubmissionEntity } from 'src/database/schemas/submissions/submissions.entity';
import {
  CreateSubmissionDTO,
  UpdateSubmissionDTO,
} from 'src/database/schemas/submissions/submissions.dto';
import { SubmissionRepository } from 'src/database/schemas/submissions/submissions.repository';

@Injectable()
export class SubmissionService extends CrudQueryService<
  SubmissionEntity,
  CreateSubmissionDTO,
  UpdateSubmissionDTO
> {
  constructor(private submissionRepository: SubmissionRepository) {
    super(submissionRepository);
  }
}
