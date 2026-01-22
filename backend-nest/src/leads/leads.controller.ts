import {
  Controller,
  Get,
  Patch,
  Query,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(['new', 'viewed', 'processed'], {
    message: 'status must be new/viewed/processed',
  })
  status: 'new' | 'viewed' | 'processed';
}

class UpdateFlagDto {
  @IsBoolean()
  flagged: boolean;
}

@UseGuards(JwtAuthGuard)
@Controller('admin/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query() query: any,
  ) {
    return this.leadsService.findAll({ ...query, page, limit });
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
    @Req() req: Request,
  ) {
    console.log('PATCH raw body:', req.body); // ← ДО ValidationPipe!
    console.log('PATCH dto:', { id, dto });

    return this.leadsService.updateStatus(id, dto.status);
  }

  @Patch(':id/flag')
  @UseGuards(JwtAuthGuard)
  async updateFlag(@Param('id') id: string, @Body() dto: UpdateFlagDto) {
    console.log('PATCH flag:', { id, dto }); // ✅ Лог для дебага
    return this.leadsService.updateFlag(id, dto.flagged);
  }
}
