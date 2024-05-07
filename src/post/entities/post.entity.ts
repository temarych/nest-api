import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @ManyToOne(() => User, (user) => user.id)
  public author: User;

  @CreateDateColumn()
  public createdAt: Date;
}
