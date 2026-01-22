import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminUser } from './entities/admin-user.entity';
import { Lead } from './entities/lead.entity';
import { QuizResult } from './entities/quiz-result.entity';
import { RefreshTokenBlacklist } from './entities/refresh-token.entity';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { QuizResultsModule } from './quiz-results/quiz-results.module';
import { PublicModule } from './public/public.module';
import { StatsModule } from './stats/stats.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'admin_panel_user',
      password: process.env.DATABASE_PASSWORD || 'passkey',
      database: process.env.DATABASE_NAME || 'NewVector',
      entities: [AdminUser, Lead, QuizResult, RefreshTokenBlacklist],
      synchronize: true,
      logging: ['error'],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => [
        {
          name: 'default',
          ttl: 900, // 15 мин
          limit: 5, // 5 запросов
        },
      ],
    }),
    LeadsModule,
    QuizResultsModule,
    StatsModule,
    AuthModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
