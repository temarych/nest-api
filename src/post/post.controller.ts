import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { UpdatePostRequestDto } from './dto/update-post.request.dto';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  public async create(@Body() data: CreatePostRequestDto) {
    const post = await this.postService.create(data);
    return new PostDto(post);
  }

  @Get()
  public async findAll() {
    const posts = await this.postService.findAll();
    return posts.map((post) => new PostDto(post));
  }

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.findOne(id);
    if (!post) throw new NotFoundException('post-not-found');
    return new PostDto(post);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePostRequestDto,
  ) {
    await this.postService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.postService.remove(id);
  }
}
