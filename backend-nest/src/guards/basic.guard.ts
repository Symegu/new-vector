import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BasicGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );
    const [username, password] = credentials.split(':');

    const adminUsername = process.env.BASIC_AUTH_USERNAME;
    const passwordHash = process.env.BASIC_AUTH_PASSWORD_HASH;

    if (!adminUsername || !passwordHash) {
      throw new UnauthorizedException('Auth config is missing');
    }

    const isUsernameValid = username === adminUsername;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (isUsernameValid && isPasswordValid) {
      return true;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
