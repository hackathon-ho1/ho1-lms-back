import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DatabaseProvider } from 'src/providers/database/database.provider';

@Injectable()
export class GotgamService {
  constructor(private readonly databaseProvider: DatabaseProvider) {}

  async getAllGotgam(monthValue) {
    const currentYear = new Date().getFullYear()
    const sqlStatement = `SELECT achievedAt FROM gotgam WHERE YEAR(achievedAt) = ${currentYear} AND MONTH(achievedAt) = ${monthValue} ORDER BY achievedAt ASC`;
    const [getAllGotgamData] = await this.databaseProvider.execute(sqlStatement) as RowDataPacket[][];

    let month = new Array(31).fill(0)
    for (const gotgam of getAllGotgamData) {
      const day = Number(gotgam.achievedAt.toISOString().slice(8, 10))
      ++month[day-1]
    }

    for (let i = 0; i < month.length; i++) {
      if (month[i] > 0 && month[i] < 4) {
        month[i] = 1
      } else if (month[i] > 3 && month[i] < 7) {
        month[i] = 2
      } else if (month[i] > 6){
        month[i] = 3
      }
    }
    
    return month

  }

  async getOneGotgam(gotgamDate, userId){
    const sqlStatement = `
    SELECT a.id, a.lectureId, a.achievedAt, d.title AS courseTitle, c.title AS chapterTitle, b.title AS lectureTitle
    FROM gotgam a
    INNER JOIN lecture b
    ON a.lectureId = b.id
    INNER JOIN chapter c
    ON b.chapterId = c.id
    INNER JOIN course d
    ON c.courseId = d.id
    WHERE DATE(achievedAt) = '${gotgamDate}' AND userId = ${userId}
    `;

    const [result] = await this.databaseProvider.execute(sqlStatement) as RowDataPacket[][]
    for (const item of result) {
      item.achievedAt = item.achievedAt.toISOString().split('T')[0]
    }

    return result
  }
}