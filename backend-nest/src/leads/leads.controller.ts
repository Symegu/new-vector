import {
  Controller,
  Get,
  Patch,
  Query,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { IsBoolean } from 'class-validator';

class UpdateStatusDto {
  status: 'new' | 'viewed' | 'processed';
}

class UpdateFlagDto {
  @IsBoolean()
  flagged: boolean;
}

@Controller('admin/leads')
@UsePipes(new ValidationPipe({ transform: true }))
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query() query: any,
  ) {
    return this.leadsService.findAll({ ...query, page, limit });
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    console.log('PATCH status:', { id, dto }); // ✅ Лог для дебага
    return this.leadsService.updateStatus(id, dto.status);
  }

  @Patch(':id/flag')
  async updateFlag(@Param('id') id: string, @Body() dto: UpdateFlagDto) {
    console.log('PATCH flag:', { id, dto }); // ✅ Лог для дебага
    return this.leadsService.updateFlag(id, dto.flagged);
  }
}
