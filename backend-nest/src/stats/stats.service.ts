// stats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Lead } from '../entities/lead.entity';
import { QuizResult } from '../entities/quiz-result.entity';

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  processedLeads: number;
  totalQuizzes: number;
  todayLeads: number;
  yesterdayLeads: number;
  weekLeads: number;
}

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    @InjectRepository(QuizResult)
    private quizRepository: Repository<QuizResult>,
  ) {}

  async getDashboardStats(): Promise<DashboardStats> {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const yesterdayStart = new Date(todayStart.getTime() - 86400000);
    const weekStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7,
    );

    // Статистика лидов
    const [
      totalLeads,
      newLeads,
      processedLeads,
      todayLeads,
      yesterdayLeads,
      weekLeads,
    ] = await Promise.all([
      this.leadRepository.count(),
      this.leadRepository.count({ where: { status: 'new' } }),
      this.leadRepository.count({ where: { status: 'processed' } }),
      this.leadRepository.count({
        where: { createdAt: Between(todayStart, now) },
      }),
      this.leadRepository.count({
        where: { createdAt: Between(yesterdayStart, todayStart) },
      }),
      this.leadRepository.count({
        where: { createdAt: Between(weekStart, now) },
      }),
    ]);

    // Статистика тестов
    const totalQuizzes = await this.quizRepository.count();

    return {
      totalLeads,
      newLeads,
      processedLeads,
      totalQuizzes,
      todayLeads,
      yesterdayLeads,
      weekLeads,
    };
  }
}
