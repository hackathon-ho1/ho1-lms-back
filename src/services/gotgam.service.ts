import { Injectable } from '@nestjs/common';
import { AchievedLectureDto } from 'src/dtos/gotgam.dto';
import { DatabaseProvider } from 'src/providers/database/database.provider';

@Injectable()
export class GotgamService {
  constructor(private readonly databaseProvider: DatabaseProvider) {}

  async getAllGotgam() {
    const sqlStatement = `
    select a.id, a.lectureId, d.title as courseTitle, c.title as chapterTitle, b.title as lectureTitle
    from gotgam a
    inner join lecture b
    on a.lectureId = b.id
    inner join chapter c
    on b.chapterId = c.id
    inner join course d
    on c.courseId = d.id`;

    const [getAllGotgamData] = await this.databaseProvider.execute(sqlStatement);
    return getAllGotgamData;
  }
}
