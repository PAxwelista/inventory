import { Item } from 'src/items/item.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
