import { Module } from '@nestjs/common';
import { LectureController } from '../controller/lecture.controller';
import { LectureService } from '../service/lecture.service';
import { LectureDto } from '../dto/lecture.dto';

@Module({
  controllers: [LectureController],
  providers: [LectureService, LectureDto],
})
export class LectureModule {}
