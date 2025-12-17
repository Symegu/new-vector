// src/public/public.service.ts
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../entities/lead.entity';
import { QuizResult } from '../entities/quiz-result.entity';

interface CreateLeadInput {
  name: string;
  phone: string;
  email: string;
  message?: string;
  quizResultId?: string;
}

interface CreateQuizResultInput {
  score: number;
  level: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  answers: string[];
}

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadsRepo: Repository<Lead>,
    @InjectRepository(QuizResult)
    private readonly quizRepo: Repository<QuizResult>,
  ) {}

  async createQuizResult(dto: CreateQuizResultInput) {
    const quiz = this.quizRepo.create({
      score: dto.score,
      level: dto.level,
      title: dto.title,
      message: dto.message,
      answers: dto.answers,
    });
    const saved = await this.quizRepo.save(quiz);
    return { status: 'ok', id: saved.id };
  }

  async createLead(dto: CreateLeadInput) {
    const name = dto.name?.trim();
    const phone = dto.phone?.trim();
    const email = dto.email?.trim();

    if (!name || !phone || !email) {
      throw new BadRequestException({
        status: 'validation_error',
        message: 'Пожалуйста, заполните имя, телефон и email.',
      });
    }

    try {
      const existing = await this.leadsRepo.findOne({
        where: { phone, email }, // строго по паре
        order: { createdAt: 'DESC' },
      });

      if (existing) {
        return {
          status: 'duplicate' as const,
          leadId: existing.id,
          createdAt: existing.createdAt,
          leadStatus: existing.status,
        };
      }

      const lead = this.leadsRepo.create({
        name,
        phone,
        email,
        message: dto.message,
        source: dto.quizResultId ? 'quiz_result' : 'landing_contact',
        quizResultId: dto.quizResultId,
      });

      const saved = await this.leadsRepo.save(lead);

      return {
        status: 'ok' as const, // для формы
        leadId: saved.id,
        createdAt: saved.createdAt,
        leadStatus: saved.status, // если вдруг пригодится
      };
    } catch (e) {
      console.log(e);

      throw new InternalServerErrorException({
        status: 'error',
        message:
          'Не удалось сохранить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.',
      });
    }
  }
}
