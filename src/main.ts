import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interfaces/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  console.log('DATABASE_URL is defined:', !!process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  //Aplicar validaciones globales para los DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  //2.
  app.useGlobalInterceptors(new TransformInterceptor());

  //3.
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
