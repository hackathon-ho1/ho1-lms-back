import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as winston from 'winston';
const DailyRotateFile = require('winston-daily-rotate-file');

@Injectable()
export class Logger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const { combine, timestamp, label, printf, colorize, simple } =
      winston.format;
    const env = process?.env?.NODE_ENV ?? 'development';
    // 형식 설정
    const logFormat = printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level} | ${message}`;
    });

    // 커스텀 포맷 설정
    const customFormat = winston.format.combine(
      label({ label: env }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    );

    this.logger = winston.createLogger({
      format: customFormat,
      transports: [
        // 콘솔 출력 설정 (info 레벨 이상 출력)
        new winston.transports.Console({
          level: 'http',
        }),
        // 일별 로그 파일 생성 및 저장 설정
        new DailyRotateFile({
          level: 'http', // 로그 레벨 설정
          filename: 'logs/%DATE%.log', // 로그 파일 이름 (일별로 분리됨)
          datePattern: 'YYYY-MM-DD', // 파일 이름에 들어갈 날짜 형식
          zippedArchive: true, // 로그 압축 여부
          maxSize: '20m', // 로그 파일 크기 제한
          maxFiles: '14d', // 로그 파일 보관 기간
        }),
        new DailyRotateFile({
          level: 'error',
          filename: `logs/error/%DATE%.error.log`,
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
        }),
      ],
      // uncaughtException 발생 시 로깅
      exceptionHandlers: [
        new DailyRotateFile({
          level: 'error',
          filename: 'logs/uncaughtException/%DATE%.exception.log',
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  http(message: string, context?: string) {
    this.logger.http(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
