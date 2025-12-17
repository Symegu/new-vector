import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResultsController } from './quiz-results.controller';
import { QuizResultsService } from './quiz-results.service';
import { QuizResult } from '../entities/quiz-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizResult])],
  controllers: [QuizResultsController],
  providers: [QuizResultsService],
  exports: [QuizResultsService],
})
export class QuizResultsModule {}
