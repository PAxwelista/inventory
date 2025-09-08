import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { App } from '../apps/app.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  app: App;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column('json')
  options: Record<string,any>;

  @CreateDateColumn()
  created_at: Date;
}
