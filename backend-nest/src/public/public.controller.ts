// src/public/public.controller.ts
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PublicService } from './public.service';
import {
  Equals,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Throttle } from '@nestjs/throttler';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите имя.' })
  @MaxLength(100, { message: 'Имя слишком длинное.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите телефон.' })
  @Matches(/^[+7][0-9\s\-\(\)]{10,}$/, {
    message: 'Формат: +7 (XXX) XXX-XX-XX',
  })
  phone: string; // + Matches по плану

  @IsEmail({}, { message: 'Проверьте формат email.' })
  @MaxLength(255, { message: 'Email слишком длинный.' })
  email: string; // + MaxLength

  @IsOptional()
  @IsString()
  @MaxLength(2000, { message: 'Сообщение слишком длинное.' })
  message?: string;

  @IsOptional()
  @IsString()
  quizResultId?: string;

  @IsBoolean({ message: 'Согласие обязательно' })
  @Equals(true)
  consent: boolean;

  @IsOptional()
  @MaxLength(1, { message: 'Spam detected' }) // Honeypot
  honeypot?: string;
}
export class CreateQuizResultDto {
  @IsNumber({}, { message: 'Score должен быть числом' })
  @Min(0)
  @Max(100)
  score: number;

  @IsEnum(['low', 'medium', 'high'], { message: 'Level: low/medium/high' })
  level: 'low' | 'medium' | 'high';

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  message: string;

  @IsArray()
  @IsString({ each: true })
  answers: string[];

  @IsOptional()
  @MaxLength(1)
  honeypot?: string; // + honeypot
}

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Post('quiz-results')
  @Throttle({ default: { limit: 5, ttl: 900 } })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  createQuizResult(@Body() dto: CreateQuizResultDto) {
    return this.publicService.createQuizResult(dto);
  }

  @Post('leads')
  @Throttle({ default: { limit: 5, ttl: 900 } })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  createLead(@Body() dto: CreateLeadDto) {
    return this.publicService.createLead(dto);
  }
}
