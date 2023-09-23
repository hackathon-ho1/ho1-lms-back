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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    LectureModule,
    GotgamModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseProvider],
})
export class AppModule {}
