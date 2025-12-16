import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('quiz_results')
@Index(['level'])
@Index(['flagged'])
@Index(['createdAt'])
export class QuizResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  level: 'low' | 'medium' | 'high';

  @Column('text', { array: true, default: {} })
  answers: string[];

  @Column({ default: false })
  flagged: boolean;

  @Column({ type: 'int', nullable: true })
  score: number | null;

  @Column({ type: 'text', nullable: true })
  title: string | null;

  @Column({ type: 'text', nullable: true })
  message: string | null;
}
