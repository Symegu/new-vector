import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-access') {
  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
