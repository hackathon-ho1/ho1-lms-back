import { Controller, Get } from '@nestjs/common';

@Controller('gotgam')
export class GotgamController {
  @Get()
  async getAllGotgam() {
    console.log('hi');
    return 'world';
  }
}
