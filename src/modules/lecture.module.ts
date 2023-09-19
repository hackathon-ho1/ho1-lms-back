import { Module } from '@nestjs/common';
import { LectureController } from '../controllers/lecture.controller';
import { LectureService } from '../services/lecture.service';
import { LectureProvider } from '../providers/lecture.provider';

@Module({
  controllers: [LectureController],
  providers: [LectureService, LectureProvider],
})
export class LectureModule {}
