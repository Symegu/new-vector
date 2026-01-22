import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizResult } from '../entities/quiz-result.entity';
import { Lead } from '../entities/lead.entity';

interface QuizResultsQuery {
  page?: string;
  limit?: string;
  search?: string;
}

type QuizResultRawRow = {
  qr_id: string;
  qr_created_at: string;
  qr_level: 'low' | 'medium' | 'high';
  qr_title: string | null;
  qr_message: string | null;
  qr_answers: string[] | null;
  lead_name: string | null;
};

@Injectable()
export class QuizResultsService {
  constructor(
    @InjectRepository(QuizResult)
    private quizResultsRepository: Repository<QuizResult>,
  ) {}

  async findAll(query: QuizResultsQuery) {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '20', 10);
    const skip = (page - 1) * limit;

    const qb = this.quizResultsRepository
      .createQueryBuilder('qr')
      .leftJoin(Lead, 'lead', 'lead.quiz_result_id = qr.id');

    if (query.search) {
      const term = `%${query.search.trim()}%`;
      qb.andWhere('LOWER(lead.name) LIKE LOWER(:term)', { term });
    }

    const total = await qb.getCount();

    const rawRows: QuizResultRawRow[] = await qb
      .select([
        'qr.id AS qr_id',
        'qr.created_at AS qr_created_at',
        'qr.level AS qr_level',
        'qr.title AS qr_title',
        'qr.message AS qr_message',
        'qr.answers AS qr_answers',
        'lead.name AS lead_name',
      ])
      .orderBy('qr.created_at', 'DESC')
      .addOrderBy('qr.id', 'DESC')
      .take(limit)
      .skip(skip)
      .getRawMany<QuizResultRawRow>();

    const results = rawRows.map((row) => ({
      id: row.qr_id,
      createdAt: row.qr_created_at,
      level: row.qr_level,
      title: row.qr_title,
      message: row.qr_message,
      answers: row.qr_answers || [],
      leadName: row.lead_name || null,
    }));

    return { results, total, page, limit };
  }
}
