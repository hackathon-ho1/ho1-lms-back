import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LectureService {
  constructor(private readonly DatabaseProvider) {}
  async getCourses() {
    return await this.DatabaseProvider.query('SELECT * FROM courses');
  }
  async getCourse(courseId: string) {}
  async getLecture(lectureId: string) {}
}
