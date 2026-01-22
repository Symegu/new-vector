import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../entities/admin-user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../guards/jwt.strategy';
import { AuthLoginDto } from './auth.controller';
import { RefreshTokenBlacklist } from '../entities/refresh-token.entity';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokenBlacklist)
    private blacklistRepository: Repository<RefreshTokenBlacklist>,
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

  async refreshTokens(
    oldRefreshToken: string,
    payload: { id: string; login: string },
  ): Promise<AuthTokens> {
    try {
      // 1. Проверка blacklist
      if (await this.isRefreshTokenBlacklisted(oldRefreshToken)) {
        throw new UnauthorizedException('Token blacklisted');
      }

      // 3. Blacklist старый токен
      await this.blacklistRefreshToken(oldRefreshToken);

      // 4. Генерируем новые
      return this.generateTokens(payload.id, payload.login);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async blacklistRefreshToken(token: string) {
    await this.blacklistRepository.upsert(
      {
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // TTL
      },
      ['token'],
    );
  }

  private async isRefreshTokenBlacklisted(token: string): Promise<boolean> {
    const blacklisted = await this.blacklistRepository.findOne({
      where: { token },
    });
    if (blacklisted) {
      return true;
    }
    return false;
  }

  private generateTokens(userId: string, login: string): AuthTokens {
    const payload = { sub: userId, login: login };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign({
      ...payload,
      date: Date.now(),
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    return { accessToken, refreshToken };
  }
}
