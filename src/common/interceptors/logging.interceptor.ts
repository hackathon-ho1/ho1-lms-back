import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Logger } from 'src/services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const startTime = Date.now(); // 응답 처리 시작 시간 저장

    return next.handle().pipe(
      catchError((error) => {
        let status = 500;
        let message = 'Internal Server Error';

        if (error instanceof HttpException) {
          status = error.getStatus();
          message = error.message;
        }

        // 에러 처리 및 로깅
        this.logger.http(
          `${req.method} ${req.url} - ${res.statusCode} ${
            Date.now() - startTime
          }ms\n` +
            `========================[REQUEST]========================\n` +
            `Request Headers: {\n` +
            Object.keys(req.headers)
              .map((key) => `  "${key}": "${req.headers[key]}"`)
              .join(',\n') +
            `\n}\n` +
            `Request Body: {\n` +
            Object.keys(req.body)
              .map((key) => `  "${key}": "${req.body[key]}"`)
              .join(',\n') +
            `\n}\n` +
            `========================[RESPONSE]========================\n` +
            `Response Time: ${Date.now() - startTime}ms\n` +
            `Response Body: {\n` +
            `${status}\n${message}`,
        );

        //따로 로그를 남겨야 할만한 에러일 경우 에러 정보 로깅. 지금은 익셉션이나 에러를 커스텀하지 않아서 500이상을 기준으로 정함
        if (status >= 500) {
          this.logger.error(`${message}\n${error.stack}`, '');
        }

        // 에러를 다시 던져서 전달
        return throwError(() => error);
      }),
      map((data) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // 응답 정보를 로그에 남김
        this.logger.http(
          `${req.method} ${req.url} - ${res.statusCode} ${responseTime}ms\n` +
            `========================[REQUEST]========================\n` +
            `Request Headers: {\n` +
            Object.keys(req.headers)
              .map((key) => `  "${key}": "${req.headers[key]}"`)
              .join(',\n') +
            `\n}\n` +
            `Request Body: {\n` +
            Object.keys(req.body)
              .map((key) => `  "${key}": "${req.body[key]}"`)
              .join(',\n') +
            `\n}\n` +
            `========================[RESPONSE]========================\n` +
            `Response Time: ${Date.now() - startTime}ms\n`,
          //+ `Response Body: ${data}`,
        );

        return {
          statusCode: 200,
          data,
        };
      }),
    );
  }
}
