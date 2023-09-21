import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LectureService {
  constructor(private readonly DatabaseProvider) {}
  async getCourses() {
    //throw new Error();
    //throw new BadRequestException('잘못된 날짜입니다.');
    return { name: 'test' };
  }
}
