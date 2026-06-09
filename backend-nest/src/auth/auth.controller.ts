import {
  Controller,
  Post,
  Body,
  HttpCode,
  Res,
  Req,
  ExecutionContext,
  createParamDecorator,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { IsString, IsNotEmpty } from 'class-validator';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  login!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
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
    const { accessToken } = await this.authService.login(loginDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    return { success: true };
  }

  @Post('auth/logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return { success: true };
  }

  @Get('auth/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: AuthLoginDto) {
    return {
      authenticated: true,
      user: req.login,
    };
  }
}
