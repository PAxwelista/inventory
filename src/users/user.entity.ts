import { App } from 'src/apps/app.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column()
  email:string;

  @Column()
  password:string;
  
  @OneToMany(()=> App , (app)=>app.user)
  app:App[]

  @CreateDateColumn()
  created_at: Date;


}
