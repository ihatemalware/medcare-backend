import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // bỏ field thừa FE gửi lên
      forbidNonWhitelisted: false,
      transform: true,          // tự cast kiểu (string → number) theo DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('MedCare Backend API')
    .setDescription('API documentation for MedCare webdev competition')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();

