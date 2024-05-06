import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepository.save(createPostDto);
  }

  public async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  public async findOne(id: string) {
    return await this.postRepository.findOneBy({ id });
  }

  public async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id, updatePostDto);
  }

  public async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
