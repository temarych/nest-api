import { Post } from './entities/post.entity';

export interface ICreatePostData
  extends Omit<Post, 'id' | 'author' | 'createdAt'> {
  authorId: string;
}

export interface IUpdatePostData
  extends Partial<Omit<Post, 'id' | 'author' | 'createdAt'>> {}
