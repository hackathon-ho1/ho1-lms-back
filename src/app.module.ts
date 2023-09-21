import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureModule } from './modules/lecture.module';
import { LectureProvider } from './providers/lecture.provider';
import { GotgamModule } from './modules/gotgam.module';
import { GotgamProvider } from './providers/gotgam.provider';

@Module({
  imports: [
    LectureModule,
    GotgamModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LectureProvider, GotgamProvider],
})
export class AppModule {}
