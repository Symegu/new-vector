// src/admin/quiz-results/quiz-results.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QuizResultsService } from './quiz-results.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/quiz-results')
export class QuizResultsController {
  constructor(private readonly quizResultsService: QuizResultsService) {}

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query() query: any,
  ) {
    return this.quizResultsService.findAll({ ...query, page, limit });
  }
}
