import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, OneToOne, JoinColumn } from 'typeorm';
import { Lead } from './lead.entity';

@Entity('quiz_results')
@Index(['level'])
@Index(['flagged'])
@Index(['createdAt'])
export class QuizResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  level: 'low' | 'medium' | 'high';

  @Column('text', { array: true, default: {} })
  answers: string[];

  @Column({ nullable: true })
  leadId?: string;

  @Column({ default: false })
  flagged: boolean;

  @OneToOne(() => Lead, (lead) => lead.quizResult)
  @JoinColumn({ name: 'leadId' })
  lead?: Lead;
}
