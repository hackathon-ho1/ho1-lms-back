import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseProvider } from 'src/providers/database/database.provider';

@Injectable()
export class LectureService {
  constructor(private readonly databaseProvider: DatabaseProvider) {}
  async getCourses() {
    throw new Error();
    throw new BadRequestException('잘못된 날짜입니다.');
    return { name: 'test' };
  }
}
