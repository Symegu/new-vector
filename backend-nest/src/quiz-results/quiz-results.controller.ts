// src/admin/quiz-results/quiz-results.controller.ts
import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizResultsService } from './quiz-results.service';

@Controller('admin/quiz-results')
@UsePipes(new ValidationPipe({ transform: true }))
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
