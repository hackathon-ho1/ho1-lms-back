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

@Controller('course')
export class LectureController {
  constructor(private readonly lecturerService: LectureService) {}

  @Get()
  async getCourses() {
    return await this.lecturerService.getCourses();
  }
  @Get(':courseId')
  async getCourse(@Param('courseId') courseId: string) {
    return await this.lecturerService.getCourse(courseId);
  }

  @Get('lecture/:lectureId')
  async getLecture(@Param('lectureId') lectureId: string) {
    return await this.lecturerService.getLecture(lectureId);
  }
}
