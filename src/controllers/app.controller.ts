import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(1);
  }

  @Get('test')
  getHello2(): string {
    return this.appService.getHello(2);
  }

}
