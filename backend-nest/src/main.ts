import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      exceptionFactory: (errors) => {
        // соберём ошибки по полям в простой объект
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

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log('🚀 NestJS запущен на http://localhost:3001');
}
bootstrap();
