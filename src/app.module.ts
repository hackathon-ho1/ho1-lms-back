import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureModule } from './modules/lecture.module';
import { LectureProvider } from './providers/lecture.provider';
import { DatabaseProvider } from './providers/database/database.provider';
import { GotgamModule } from './modules/gotgam.module';

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
  providers: [AppService, LectureProvider, DatabaseProvider],
})
export class AppModule {}
