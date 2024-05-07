import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  public async create(data: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    return await this.postRepository.save(data);
  }

  public async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  public async findOne(id: string): Promise<Post | null> {
    return await this.postRepository.findOneBy({ id });
  }

  public async update(
    id: string,
    data: Partial<Omit<Post, 'id' | 'createdAt'>>,
  ): Promise<void> {
    await this.postRepository.update(id, data);
  }

  public async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
