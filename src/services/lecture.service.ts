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
  async getCourse(userId: number, courseId: string) {
    const getCourseresult = await this.lectureProvider.getCourse(
      courseId,
      userId,
    );
    const course = getCourseresult[0];
    const getChaptersByCourseId =
      await this.lectureProvider.getChaptersByCourseId(courseId, userId);

    const getLecturesByChaterId = await Promise.all(
      getChaptersByCourseId.map(async (chapter) => {
        const lecturesResult = await this.lectureProvider.getLecturesByChaterId(
          chapter.chapterId,
          userId,
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
