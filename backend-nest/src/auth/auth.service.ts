import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../entities/admin-user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDto } from './auth.controller';

export interface AuthTokens {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: AuthLoginDto): Promise<AuthTokens> {
    const user = await this.adminUserRepository.findOne({
      where: { login: loginDto.login },
    });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const tokens = this.generateTokens(user.id, user.login);

    return tokens;
  }

  private generateTokens(userId: string, login: string): AuthTokens {
    const payload = { sub: userId, login: login };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
