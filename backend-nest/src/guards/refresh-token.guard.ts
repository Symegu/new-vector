import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('🔍 RefreshTokenGuard canActivate вызван');
    try {
      const result = (await super.canActivate(context)) as boolean;
      console.log('🔍 Guard result:', result);
      return result;
    } catch (err) {
      console.log('🔍 Guard error:', err.message);
      return false;
    }
  }

  // handleRequest(err: any, user: any, info: any) {
  //   console.log('🔍 handleRequest user:', user, 'info:', info);
  //   if (err || !user) {
  //     console.log('🔍 No user, error:', err?.message || info);
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
