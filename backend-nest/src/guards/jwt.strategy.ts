// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  login: string;
  exp: number;
  iat: number;
  date?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private configService: ConfigService) {
    super({
      // ✅ Custom extractor для cookie
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // 1. Bearer
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        process.env.JWT_SECRET ||
        'default_secret',
    });
  }

  validate(payload: JwtPayload) {
    console.log('JwtStrategy payload:', payload); // ✅ Для дебага
    if (!payload?.sub || !payload?.login) {
      throw new UnauthorizedException('Invalid payload');
    }
    return { id: payload.sub, login: payload.login };
  }
}
