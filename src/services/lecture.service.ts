import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LectureService {
  async getCourses() {
    throw new BadRequestException('잘못된 날짜입니다.');
    return '응답';
  }
}
