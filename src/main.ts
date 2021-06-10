import { SneakerLogger } from './logger/sneaker-logger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IsMongoIdPipe } from './common/pipes/is-mongo-id.pipe';
import { validatorConfig } from './common/validators.config';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new SneakerLogger(),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      ...validatorConfig,
      transform: true,
    }),
  );

  app.useGlobalPipes(new IsMongoIdPipe());
  app.enableCors({
    credentials: true,
  });
  app.useGlobalGuards
  app.use(helmet());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
