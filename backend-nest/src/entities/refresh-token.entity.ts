import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('refresh_token_blacklist')
export class RefreshTokenBlacklist {
  @PrimaryColumn()
  token: string;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  blacklistedAt: Date;
}
