import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@modules/auth/auth.guard';
import { ApiErrorCause } from '@typings/ApiErrorCause';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get me',
    operationId: 'getMe',
    tags: ['user'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: UserDto,
  })
  public async getMe(@Req() request) {
    const user = request.user as User;
    return new UserDto(user);
  }

  @Get('/users')
  @ApiOperation({
    summary: 'Get users',
    operationId: 'getUsers',
    tags: ['user'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [UserDto],
  })
  public async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @Get('/users/:id')
  @ApiOperation({
    summary: 'Get user',
    operationId: 'getUser',
    tags: ['user'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: UserDto,
  })
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(ApiErrorCause.UserNotFound);
    return new UserDto(user);
  }
}
