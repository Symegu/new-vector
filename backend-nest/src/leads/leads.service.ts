import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Lead } from '../entities/lead.entity';

interface LeadsQuery {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
  source?: string;
  flagged?: string;
}

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
  ) {}

  async findAll(query: LeadsQuery) {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '20');
    const skip = (page - 1) * limit;

    const qb = this.leadsRepository.createQueryBuilder('lead');

    // Базовые фильтры
    if (query.status && query.status !== 'all') {
      qb.andWhere('lead.status = :status', { status: query.status });
    }

    if (query.source && query.source !== 'all') {
      qb.andWhere('lead.source = :source', { source: query.source });
    }

    if (query.flagged === 'true') {
      qb.andWhere('lead.flagged = :flagged', { flagged: true });
    }

    // Поиск по ИЛИ (имя ИЛИ телефон ИЛИ email)
    if (query.search) {
      const searchTerm = `%${query.search}%`;
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(lead.name) LIKE LOWER(:searchName)', {
            searchName: searchTerm,
          })
            .orWhere('lead.phone LIKE :searchPhone', {
              searchPhone: searchTerm,
            })
            .orWhere('LOWER(lead.email) LIKE LOWER(:searchEmail)', {
              searchEmail: searchTerm,
            });
        }),
      );
    }

    const [leads, total] = await qb
      .orderBy('lead.createdAt', 'DESC')
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return { leads, total, page, limit };
  }

  async updateStatus(id: string, status: Lead['status']) {
    const lead = await this.leadsRepository.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead not found');

    lead.status = status;
    return this.leadsRepository.save(lead);
  }

  async updateFlag(id: string, flagged: boolean) {
    const lead = await this.leadsRepository.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead not found');

    lead.flagged = flagged;
    return this.leadsRepository.save(lead);
  }
}
