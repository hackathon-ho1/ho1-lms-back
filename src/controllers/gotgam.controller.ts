import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AchievedLectureDto } from 'src/dtos/gotgam.dto';
import { GotgamService } from 'src/services/gotgam.service';

@Controller('gotgam')
export class GotgamController {
  constructor(private readonly gotgamService: GotgamService) {}

  @Get()
  async getAllGotgam(@Query('month') month: string) {
    console.log(month)
    const result = await this.gotgamService.getAllGotgam();
    return result;
  }
}
