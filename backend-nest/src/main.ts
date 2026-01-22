// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      exceptionFactory: (errors) => {
        const fieldErrors: Record<string, string> = {};
        for (const err of errors) {
          if (err.constraints) {
            fieldErrors[err.property] = Object.values(err.constraints)[0];
          }
        }
        return new BadRequestException({
          status: 'validation_error',
          errors: fieldErrors,
        });
      },
    }),
  );
  const port = process.env.PORT || 3001;
  await app.listen(port, () => {
    console.log('App starting listen port: ', port);
  });
}
bootstrap();
