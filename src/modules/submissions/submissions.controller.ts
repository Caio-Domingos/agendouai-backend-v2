import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { SubmissionEntity } from 'src/database/schemas/submissions/submissions.entity';
import {
  CreateSubmissionDTO,
  SubmissionDto,
  UpdateSubmissionDTO,
} from 'src/database/schemas/submissions/submissions.dto';
import { SubmissionService } from './submissions.service';

// Criamos o controlador base usando a função factory
const SubmissionControllerBase = CrudQueryController<
  SubmissionEntity,
  typeof CreateSubmissionDTO,
  typeof UpdateSubmissionDTO,
  typeof SubmissionDto
>('submissions', CreateSubmissionDTO, UpdateSubmissionDTO, SubmissionDto);

@ApiTags('Submissões')
@Controller('submissions')
export class SubmissionController extends SubmissionControllerBase {
  constructor(readonly submissionService: SubmissionService) {
    super(submissionService);
  }
}
