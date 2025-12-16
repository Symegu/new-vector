import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('leads')
@Index(['status'])
@Index(['flagged'])
@Index(['createdAt'])
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
    default: 'landing_contact',
    comment: 'landing_contact | quiz_result',
  })
  source: 'landing_contact' | 'quiz_result';

  @Column({
    name: 'quiz_result_id',
    type: 'uuid',
    nullable: true,
    comment: 'quiz_result_id FK',
  })
  quizResultId?: string;
}
