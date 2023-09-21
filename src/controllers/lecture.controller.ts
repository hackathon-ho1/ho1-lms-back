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
import { LectureService } from 'src/services/lecture.service';

@Controller()
export class LectureController {
  constructor(private readonly lecturerService: LectureService) {}

  @Get('course')
  async getCourses() {
    return await this.lecturerService.getCourses();
  }
}
