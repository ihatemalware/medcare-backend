import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // (Nếu bạn đang set global prefix hoặc CORS thì giữ nguyên)

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('MedCare Backend API')
    .setDescription('API documentation for MedCare webdev competition')
    .setVersion('1.0')
    .addBearerAuth() // để thử với JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
