import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //TODO ну вообще как бы убрать или переписать
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
