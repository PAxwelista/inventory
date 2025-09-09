import { Item } from '../items/item.entity';
import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('apps')
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  api_key: string;

  @OneToMany(() => Item, (item) => item.app)
  items: Item[];

  @ManyToOne(() => User)
  @JoinColumn({name:'user_id'})
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
