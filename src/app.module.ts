import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureModule } from './modules/lecture.module';
import { LectureProvider } from './providers/lecture.provider';
import { BaseResponse } from './baseResponse';

@Module({
  imports: [LectureModule, ConfigModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService, LectureProvider, BaseResponse],
})
export class AppModule {}
