// guards/refresh-token.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log('🔍 Refresh extractor cookies:', req.cookies);
          if (req.cookies && req.cookies.refresh_token) {
            return req.cookies.refresh_token;
          }
          return null;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
    });
  }

  async validate(payload: JwtPayload): Promise<{ id: string; login: string }> {
    // if (payload.exp && payload.exp * 1000 < Date.now()) {
    //   throw new UnauthorizedException('Refresh token expired');
    // }
    console.log('🔍 RefreshTokenStrategy:', payload);
    if (!payload?.sub || !payload?.login) {
      throw new UnauthorizedException('Invalid payload');
    }
    return { id: payload.sub, login: payload.login };
  }
}
