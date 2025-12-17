// src/public/public.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { Lead } from '../entities/lead.entity';
import { QuizResult } from '../entities/quiz-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, QuizResult])],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
