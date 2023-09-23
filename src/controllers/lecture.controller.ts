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
import { query } from 'winston';

@Controller('course')
export class LectureController {
  private mapper: LectureMapper;

  constructor(private readonly lecturerService: LectureService) {
    this.mapper = new LectureMapper();
  }

  // 코스 목록 조회
  @Get()
  async getCourses(
    @Query('userId') userId: number,
    @Query('cursor') cursor: number,
    @Query('limit') limit: number,
  ): Promise<GetCoursesResponseDto> {
    if (!cursor) {
      cursor = Infinity;
    }
    const result = await this.lecturerService.getCourses(userId, cursor, limit);
    return this.mapper.coursesDomainToDto(result);
  }

  // 코스 상세 조회
  @Get(':courseId')
  async getCourse(
    @Param('courseId') courseId: string,
    @Query('userId') userId: number,
  ) {
    const result = await this.lecturerService.getCourse(userId, courseId);
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
