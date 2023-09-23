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
import {
  GetCoursesResponseDto,
  GetCourseResponseDto,
} from 'src/dtos/lecture.dto';
import { LectureMapper } from 'src/mapper/lecture.mapper';
import { LectureService } from 'src/services/lecture.service';

@Controller('course')
export class LectureController {
  private mapper: LectureMapper;

  constructor(private readonly lecturerService: LectureService) {
    this.mapper = new LectureMapper();
  }

  @Get()
  async getCourses(
    @Query('userId') userId: number,
  ): Promise<GetCoursesResponseDto> {
    const result = await this.lecturerService.getCourses(userId);
    return this.mapper.coursesDomainToDto(result);
  }
  @Get(':courseId')
  async getCourse(
    @Param('courseId') courseId: string,
    @Query('userId') userId: number,
  ) {
    const result = await this.lecturerService.getCourse(userId, courseId);
    console.log(result);
    return this.mapper.courseDomainToDto(result);
  }

  @Get('lecture/:lectureId')
  async getLecture(
    @Param('lectureId') lectureId: string,
    @Query('userId') userId: number,
  ) {
    return await this.lecturerService.getLecture(userId, lectureId);
  }
}
