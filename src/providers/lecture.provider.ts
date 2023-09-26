import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from './database/database.provider';
import { Course } from 'src/types/lecture.types';
import { LectureMapper } from 'src/mapper/lecture.mapper';

@Injectable()
export class LectureProvider {
  private mapper: LectureMapper;
  constructor(private readonly databaseProvider: DatabaseProvider) {
    this.mapper = new LectureMapper();
  }

  async getCourses(
    userId: number,
    cursor: number,
    limit: number,
  ): Promise<Course[]> {
    const result = await this.databaseProvider.execute(
      `SELECT course.*, 
            COUNT(lecture.id) AS lectureCount, 
            COUNT(gotgam.id) AS doneCount, 
            CAST(IFNULL(COUNT(gotgam.id)/COUNT(lecture.id)*100, 0) AS SIGNED) AS progress
        FROM courdse
        LEFT JOIN lecture ON course.id = lecture.courseId 
        LEFT JOIN gotgam ON course.id = gotgam.courseId AND lecture.id = gotgam.lectureId AND gotgam.userId = ?
        WHERE course.id < ?
        GROUP BY course.id
        ORDER BY course.id DESC
        LIMIT ?;`,
      [userId, cursor, limit],
    );

    return this.mapper.coursesEntityToDomain(result[0]);
  }

  async getCourse(userId: number, courseId: number): Promise<any> {
    const result = await this.databaseProvider.execute(
      `SELECT course.id AS courseId, 
            course.title AS courseTitle, 
            course.description AS courseDescription, 
            COUNT(lecture.id) AS lectureCount, 
            COUNT(gotgam.id) AS doneCount, 
            CAST(IFNULL(COUNT(gotgam.id)/COUNT(lecture.id)*100, 0) AS SIGNED) AS progress
        FROM course
        INNER JOIN chapter ON course.id = chapter.courseId 
        INNER JOIN lecture ON course.id = lecture.courseId AND chapter.id = lecture.chapterId
        LEFT JOIN gotgam ON lecture.id = gotgam.lectureId AND gotgam.userId = ?
      WHERE course.id = ?
      GROUP BY course.id
    ;`,
      [userId, courseId],
    );
    return result[0];
  }
  async getChaptersByCourseId(userId, courseId): Promise<any> {
    const result = await this.databaseProvider.execute(
      `SELECT chapter.id AS chapterId,
            chapter.title AS chapterTitle,
            COUNT(lecture.id) AS lectureCount, 
            COUNT(gotgam.id) AS doneCount, 
            CAST(IFNULL(COUNT(gotgam.id)/COUNT(lecture.id)*100, 0) AS SIGNED) AS progress
        FROM chapter
        INNER JOIN lecture ON chapter.id = lecture.chapterId AND chapter.id = lecture.chapterId
        LEFT JOIN gotgam ON lecture.id = gotgam.lectureId AND gotgam.userId = ?
      WHERE chapter.courseId = ?
      GROUP BY chapterId
    ;`,
      [userId, courseId],
    );

    return result[0];
  }

  async getLecturesByChaterId(userId, courseId) {
    const result = await this.databaseProvider.execute(
      `SELECT lecture.id AS lectureId,
            lecture.title AS lectureTitle,
            lecture.description AS lectureDescription,
            lecture.videoUrl AS VideoUrl,
            IF(gotgam.id IS NULL, 0, 1) AS isDone
        FROM chapter
        INNER JOIN lecture ON chapter.id = lecture.chapterId AND chapter.id = lecture.chapterId
        LEFT JOIN gotgam ON lecture.id = gotgam.lectureId AND gotgam.userId = ?
      WHERE lecture.chapterId = ?
    ;`,
      [userId, courseId],
    );
    return result[0];
  }

  async getLecture(lectureId: string): Promise<any> {
    const result = await this.databaseProvider.execute(
      `SELECT lecture.id AS lectureId,
            lecture.courseId AS courseId,
            lecture.chapterId AS chapterId,
            lecture.title AS lectureTitle,
            lecture.description AS lectureDescription,
            lecture.videoUrl AS VideoUrl
        FROM lecture
        WHERE lecture.id = ?
    ;`,
      [lectureId],
    );
    return result[0];
  }

  async lectureDone(
    userId: number,
    courseId: number,
    chapterId: number,
    lectureId: string,
    now: string,
  ) {
    const result = await this.databaseProvider.execute(
      `INSERT INTO gotgam (userId, courseId, chapterId, lectureId, achievedAt)
        VALUES (?, ?, ?, ?, ?)
    ;`,
      [userId, courseId, chapterId, lectureId, now],
    );
    return result[0];
  }
}
