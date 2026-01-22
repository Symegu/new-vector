import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Res,
  Req,
  ExecutionContext,
  createParamDecorator,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { IsString, IsNotEmpty } from 'class-validator';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthRefreshDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

@Controller('admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 900 } })
  @HttpCode(200)
  async login(
    @Body() loginDto: AuthLoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('login');
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    return { accessToken };
  }

  @Post('auth/refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('auth/refresh вызван', req.user);
    if (!req.user) {
      throw new UnauthorizedException('No user');
    }
    const oldRefreshToken = req.cookies['refresh_token']; // Из cookie-parser
    const newTokens = await this.authService.refreshTokens(
      oldRefreshToken,
      req.user as { id: string; login: string },
    );

    res.cookie('refresh_token', newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log('refresh tokens access', newTokens.accessToken);
    console.log('refresh tokens refresh', newTokens.refreshToken);

    return { accessToken: newTokens.accessToken };
  }
  @Post('auth/logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    await this.authService.blacklistRefreshToken(refreshToken);

    res.clearCookie('refresh_token');
    return { success: true };
  }

  // @Get('auth/check')
  // @UseGuards(JwtAuthGuard)
  // checkAuth(
  //   @Req() req: Request,
  //   // @Cookies('refresh_token') refreshToken: string,
  // ) {
  //   console.log('auth/check вызван');
  //   return { valid: true, user: req.user || 'anonymous' };
  // }
}
