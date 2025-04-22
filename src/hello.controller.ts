import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller('hello')
export class HelloController {
  @Public()
  @Get()
  getHello(): string {
    return 'Hello World';
  }
}
