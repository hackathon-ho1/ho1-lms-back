import { Injectable } from '@nestjs/common';
import {
  GetCoursesResponseDto,
  GetCourseResponseDto,
} from 'src/dtos/lecture.dto';
import { Course, Lecture } from 'src/types/lecture.types';

@Injectable()
export class LectureMapper {
  coursesDomainToDto(coures: Course[]): GetCoursesResponseDto {
    return {
      message: '코스목록 조회에 성공했습니다.',
      data: coures,
    };
  }

  courseDomainToDto(coure): GetCourseResponseDto {
    return {
      message: '코스 상세 조회에 성공했습니다.',
      data: coure,
    };
  }

  coursesEntityToDomain(courses): Course[] {
    return courses.map((course) => {
      return {
        courseId: course.id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        lectureCount: course.lectureCount,
        doneCount: course.doneCount,
        progress: course.progress,
      };
    });
  }

  courseEntityToDomain(course, chapters, lectures): Course[] {
    return course.map((course) => {
      return {
        courseId: course.id,
        title: course.title,
        description: course.description,
        lectureCount: course.lectureCount,
        doneCount: course.doneCount,
        progress: course.progress,
      };
    });
  }

  lecturesDomainToDto(lectures): Lecture[] {
    return lectures.map((lecture) => {
      return {
        lectureId: lecture.lectureId,
        lectureTitle: lecture.lectureTitle,
        lectureDescription: lecture.lectureDescription,
        VideoUrl: lecture.VideoUrl,
        isDone: lecture.isDone === 1,
      };
    });
  }

  getProgress(isDone: any): boolean[] {
    return isDone.map((isDone) => isDone === 1);
  }
}
