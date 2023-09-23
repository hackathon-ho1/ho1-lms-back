import { Injectable, BadRequestException } from '@nestjs/common';
import { LectureProvider } from 'src/providers/lecture.provider';
import { Course } from 'src/types/lecture.types';
import * as moment from 'moment';
import { LectureMapper } from 'src/mapper/lecture.mapper';

@Injectable()
export class LectureService {
  private mapper: LectureMapper;
  constructor(private readonly lectureProvider: LectureProvider) {
    this.mapper = new LectureMapper();
  }

  async getCourses(
    userId: number,
    cursor: number,
    limit: number,
  ): Promise<Course[]> {
    const getCourseresult = await this.lectureProvider.getCourses(
      userId,
      cursor,
      limit,
    );
    return getCourseresult;
  }
  async getCourse(userId: number, courseId: number) {
    const getCourseresult = await this.lectureProvider.getCourse(
      userId,
      courseId,
    );
    if (getCourseresult.length < 1 || getCourseresult.length > 1) {
      throw new BadRequestException('코스를 찾을 수 없습니다.');
    }
    const course = getCourseresult[0];

    const getChaptersByCourseId =
      await this.lectureProvider.getChaptersByCourseId(userId, courseId);

    const getLecturesByChaterId = await Promise.all(
      getChaptersByCourseId.map(async (chapter) => {
        const lecturesResult = await this.lectureProvider.getLecturesByChaterId(
          userId,
          chapter.chapterId,
        );
        const lectures = this.mapper.lecturesDomainToDto(lecturesResult);
        chapter.lectures = lectures;

        return chapter;
      }),
    );
    course.chapters = getLecturesByChaterId;

    return course;
  }
  async lectureDone(userId: number, lectureId: string) {
    const now = moment().format('YYYY-MM-DD');
    const lecture = await this.lectureProvider.getLecture(lectureId);
    if (lecture.length < 1 || lecture.length > 1) {
      throw new BadRequestException('강의를 찾을 수 없습니다.');
    }
    const result = await this.lectureProvider.lectureDone(
      userId,
      lecture[0].courseId,
      lecture[0].chapterId,
      lectureId,
      now,
    );
    return result;
  }
}
