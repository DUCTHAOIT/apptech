import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // chỉ cho phép field trong DTO
      forbidNonWhitelisted: true, // gửi field lạ → 400
      transform: true,            // tự convert kiểu dữ liệu
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running at PORT ', process.env.PORT);
}

bootstrap();
