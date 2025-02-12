import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = app.get(ConfigService);
  const port = config.get<number>('port') ?? 3000;
  await app.listen(port);
  Logger.log(`Server running on port ${port}`);
}
bootstrap();
