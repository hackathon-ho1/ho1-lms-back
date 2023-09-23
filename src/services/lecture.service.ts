import { Injectable, BadRequestException } from '@nestjs/common';
import { LectureProvider } from 'src/providers/lecture.provider';
import { Course } from 'src/types/lecture.types';

@Injectable()
export class LectureService {
  constructor(private readonly lectureProvider: LectureProvider) {}

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
        chapter.lectures = await this.lectureProvider.getLecturesByChaterId(
          chapter.chapterId,
          userId,
        );

        return chapter;
      }),
    );
    course.chapters = getLecturesByChaterId;

    return course;
  }
  async getLecture(userId: number, lectureId: string) {}
}
