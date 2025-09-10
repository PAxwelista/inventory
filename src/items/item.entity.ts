import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { App } from '../apps/app.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => App, {
    cascade: false,
  })
  @JoinColumn({ name: 'app_id' })
  app: App;

  @Column()
  app_user_id: string;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column({
    type: process.env.NODE_ENV === 'test' ? 'simple-json' : 'jsonb',
    nullable: true,
  })
  options: Record<string, any> | null;

  @CreateDateColumn()
  created_at: Date;
}
