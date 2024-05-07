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
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@modules/user/entities/user.entity';
import { AuthGuard } from '@modules/auth/auth.guard';
import { ApiErrorCause } from '@typings/ApiErrorCause';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { UpdatePostRequestDto } from './dto/update-post.request.dto';
import { PostDto } from './dto/post.dto';
import { ApiErrorDto } from '@typings/ApiErrorDto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create post',
    operationId: 'createPost',
    tags: ['post'],
  })
  @ApiOkResponse({ type: PostDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async create(@Req() request, @Body() data: CreatePostRequestDto) {
    const user = request.user as User;
    const post = await this.postService.create({ ...data, authorId: user.id });
    return new PostDto(post);
  }

  @Get()
  @ApiOperation({
    summary: 'Get posts',
    operationId: 'getPosts',
    tags: ['post'],
  })
  @ApiOkResponse({ type: [PostDto] })
  public async findAll() {
    const posts = await this.postService.findAll();
    return posts.map((post) => new PostDto(post));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get post',
    operationId: 'getPost',
    tags: ['post'],
  })
  @ApiOkResponse({ type: PostDto })
  @ApiNotFoundResponse({ type: ApiErrorDto })
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.findOne(id);
    if (!post) throw new NotFoundException(ApiErrorCause.PostNotFound);
    return new PostDto(post);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update post',
    operationId: 'updatePost',
    tags: ['post'],
  })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePostRequestDto,
  ) {
    await this.postService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Remove post',
    operationId: 'removePost',
    tags: ['post'],
  })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.postService.remove(id);
  }
}
