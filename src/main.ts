import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IsMongoIdPipe } from './common/pipes/is-mongo-id.pipe';
import { validatorConfig } from './common/validators.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      ...validatorConfig,
      transform: true,
    }),
  );

  app.useGlobalPipes(new IsMongoIdPipe());
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
