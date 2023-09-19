import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { BaseResponse } from '../baseResponse';
import { LectureService } from 'src/services/lecture.service';

@Controller()
export class LectureController {
  constructor(private readonly service: LectureService) {}

  @Get('course')
  async getCourses() {
    let result;
    try {
      result = await this.service.getCourses();
    } catch (error) {
      throw error;
    }
    return BaseResponse.success(result);
  }
}
