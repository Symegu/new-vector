import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminUser } from '../entities/admin-user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../guards/jwt.strategy';
import { BasicGuard } from '../guards/basic.guard';
import { RefreshTokenStrategy } from '../guards/refresh-token.strategy';
import { RefreshTokenBlacklist } from '../entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser, RefreshTokenBlacklist]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN') },
      }),
      global: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, BasicGuard, RefreshTokenStrategy],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
