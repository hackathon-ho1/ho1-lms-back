import { Injectable } from '@nestjs/common';
import { Course } from 'src/types/lecture.types';

@Injectable()
export class GetCoursesResponseDto {
  message: string;
  data: Course[];
}

@Injectable()
export class GetCourseResponseDto {
  message: string;
  data: {
    CouserId: number;
    courseTitle: string;
    courseDescription: string;
    lectureCount: number;
    doneCount: number;
    progress: number;
    chapters: any[];
  };
}
