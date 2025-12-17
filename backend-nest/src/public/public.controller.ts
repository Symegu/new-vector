// src/public/public.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PublicService } from './public.service';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty({ message: 'Укажите имя.' })
  @MaxLength(100, { message: 'Имя слишком длинное.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Укажите телефон.' })
  phone: string;

  @IsEmail({}, { message: 'Проверьте формат email.' })
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000, { message: 'Сообщение слишком длинное.' })
  message?: string;

  @IsOptional()
  @IsString()
  quizResultId?: string;
}

class CreateQuizResultDto {
  score: number;
  level: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  answers: string[];
}

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Post('quiz-results')
  createQuizResult(@Body() dto: CreateQuizResultDto) {
    return this.publicService.createQuizResult(dto);
  }

  @Post('leads')
  createLead(@Body() dto: CreateLeadDto) {
    return this.publicService.createLead(dto);
  }
}
