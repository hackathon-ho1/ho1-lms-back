import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureModule } from './modules/lecture.module';
import { LectureProvider } from './providers/lecture.provider';

@Module({
  imports: [LectureModule],
  controllers: [AppController],
  providers: [AppService, LectureProvider],
})
export class AppModule {}
