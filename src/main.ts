import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { Logger } from './services/logger.service';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, { logger });
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT);
  console.log(`listening on port ${process.env.PORT}`);
}
bootstrap();
