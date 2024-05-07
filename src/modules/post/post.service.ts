import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { ICreatePostData, IUpdatePostData } from './post.service.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  public async create({ authorId, ...data }: ICreatePostData): Promise<Post> {
    const post = new Post();

    Object.assign(post, data);

    post.author = new User();
    post.author.id = authorId;

    return await this.postRepository.save(post);
  }

  public async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: { author: true },
    });
  }

  public async findOne(id: string): Promise<Post | null> {
    return await this.postRepository.findOne({
      where: { id },
      relations: { author: true },
    });
  }

  public async update(id: string, data: IUpdatePostData): Promise<void> {
    await this.postRepository.update(id, data);
  }

  public async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
