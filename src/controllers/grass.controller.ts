import { Controller, Get } from '@nestjs/common';

@Controller('grass')
export class GrassController {
  @Get()
  async getAllGlass() {
    console.log('hi');
    return 'world';
  }
}
