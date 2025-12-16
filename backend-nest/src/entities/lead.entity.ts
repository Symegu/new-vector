// src/entities/lead.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ default: 'new' })
  status: 'new' | 'viewed' | 'processed';

  @Column({ default: false })
  flagged: boolean;

  @Column({ nullable: true })
  message?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'quizResultId FK',
  })
  quizResultId?: string;

  // Добавь source поле
  @Column({
    type: 'varchar',
    default: 'landing_contact',
    comment: 'landing_contact | quiz_result',
  })
  source: 'landing_contact' | 'quiz_result';
}
