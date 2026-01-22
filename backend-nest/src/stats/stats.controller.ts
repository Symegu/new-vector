// stats.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { DashboardStats } from './stats.service';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('stats')
  async getDashboardStats(): Promise<DashboardStats> {
    return this.statsService.getDashboardStats();
  }
}
