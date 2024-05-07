import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '@/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Exclude()
  @Column()
  public password: string;

  @OneToMany(() => Post, (post) => post.author)
  public posts: Post[];
}
