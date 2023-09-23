import { Body, Controller, Get, Query, Param } from '@nestjs/common';
import { MonthValue } from 'src/common/monToNum';
import { GotgamService } from 'src/services/gotgam.service';



@Controller('gotgam')
export class GotgamController {
  constructor(private readonly gotgamService: GotgamService) {}

  @Get()
  async getAllGotgam(@Query('month') month: string) {
    // month의 변수를 MonthValue enum의 키로 강제 형변환
    const userId = 1
    const monthValue = MonthValue[month as keyof typeof MonthValue] || MonthValue.jan; // 유효하지 않은 값이 올 경우: Jan으로 기본값

    const result = await this.gotgamService.getAllGotgam(monthValue, userId);
    return {
      message: '곶감 전체 조회에 성공했습니다.',
      data: result
    }
  }

  @Get(':gotgamDate')
  async getOneGotgam(@Param('gotgamDate') gotgamDate: string) {
    const userId = 1
    const result = await this.gotgamService.getOneGotgam(gotgamDate, userId)

    return {
      message: '곶감 상세 조회에 성공했습니다.',
      data: result
    }
  }
}
