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
  HttpException,
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
    if (!cursor || cursor == 0) {
      cursor = 99999999999999;
    }
    const result = await this.lecturerService.getCourses(userId, cursor, limit);
    return this.mapper.coursesDomainToDto(result);
  }

  // 코스 상세 조회
  @Get(':courseId')
  async getCourse(
    @Param('courseId') courseId: number,
    @Query('userId') userId: number,
  ) {
    //throw new Error('테스트네임');
    // console.log(Object.keys(error));
    // console.log(Object.getOwnPropertyNames(error));

    throw new HttpException('test', 200);
    // console.log(Object.keys(exception));
    // console.log(Object.getOwnPropertyNames(exception));
    const result = await this.lecturerService.getCourse(userId, courseId);
    return this.mapper.courseDomainToDto(result);
  }

  @Post('lecture/:lectureId')
  async lectureDone(
    @Param('lectureId') lectureId: string,
    @Query('userId') userId: number,
  ) {
    const result = await this.lecturerService.lectureDone(userId, lectureId);
    return {
      message: '강의 수강 완료에 성공하였습니다',
    };
  }
}
