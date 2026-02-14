import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  console.log('DATABASE_URL is defined:', !!process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  //Aplicar validaciones globales para los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //2.
  app.useGlobalInterceptors(new TransformInterceptor());

  //3.
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
