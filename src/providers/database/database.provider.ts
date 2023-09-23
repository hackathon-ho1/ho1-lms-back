import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import databaseConfig from './database.config';

@Injectable()
export class DatabaseProvider {
  private pool: mysql.Pool;
  constructor() {
    this.init();
  }

  async init() {
    const config = databaseConfig();
    this.pool = mysql.createPool(config);
  }

  async execute(query: string, values?: any[]) {
    const convertedValues = this.convertToNumbers(values);
    const connection = await this.pool.getConnection();
    try {
      const [rows, fields] = await connection.query(query, convertedValues);

      connection.release();

      return [rows, fields];
    } catch (err) {
      if (connection) {
        connection.release();
      }
      console.log(err);
      throw new Error(`${err.message}\n${err.stack}`);
      // throw new InternalServerErrorException({
      //   message: '쿼리 실행에 실패했습니다. (Database Error)',
      //   data: query,
      //   originMessage: err.message,
      // });
    }
  }

  async beginTransaction() {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      return connection;
    } catch (err) {
      connection.release();
      throw new InternalServerErrorException({
        message:
          '트랜잭션을 시작하는 중에 오류가 발생했습니다. (Database Error)',
        data: 'no data',
        originMessage: err.message,
      });
    }
  }

  async executeInTransaction(connection, query, values?: any) {
    try {
      const [rows, fields] = await connection.query(query, values);
      return [rows, fields];
    } catch (err) {
      throw new InternalServerErrorException({
        message: '쿼리 실행 중에 오류가 발생했습니다. (Database Error)',
        data: query,
        originMessage: err.message,
      });
    }
  }

  async commitTransaction(connection) {
    try {
      await connection.commit();
      connection.release();
    } catch (err) {
      throw new InternalServerErrorException({
        message: '쿼리 실행 중에 오류가 발생했습니다. (Database Error)',
        data: 'no data',
        originMessage: err.message,
      });
    }
  }

  convertToNumbers(arr: (string | number)[]): number[] {
    const result: number[] = [];
    for (const item of arr) {
      if (typeof item === 'string' && /^\d+$/.test(item)) {
        result.push(Number(item));
      } else {
        result.push(item as number);
      }
    }
    return result;
  }
}
