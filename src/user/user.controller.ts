import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  public async getMe(@Req() request) {
    const user = request.user as User;
    return new UserDto(user);
  }

  @Get('/users')
  public async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @Get('/users/:id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('user-not-found');
    return new UserDto(user);
  }
}
