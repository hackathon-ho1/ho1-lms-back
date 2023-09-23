import { Module } from '@nestjs/common';
import { LectureController } from '../controllers/lecture.controller';
import { LectureService } from '../services/lecture.service';
import { LectureProvider } from '../providers/lecture.provider';
import { DatabaseProvider } from 'src/providers/database/database.provider';
import { LectureMapper } from 'src/mapper/lecture.mapper';

@Module({
  controllers: [LectureController],
  providers: [LectureService, LectureMapper, LectureProvider, DatabaseProvider],
})
export class LectureModule {}
