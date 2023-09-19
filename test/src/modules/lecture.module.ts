import { Module } from '@nestjs/common';
import { LectureController } from '../controllers/lecture.controller';
import { LectureService } from '../services/lecture.service';
import { LectureDto } from '../dtos/lecture.dto';

@Module({
  controllers: [LectureController],
  providers: [LectureService, LectureDto],
})
export class LectureModule {}
