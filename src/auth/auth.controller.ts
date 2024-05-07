import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/signup.request.dto';
import { LogInRequestDto } from './dto/login.request.dto';
import {
  EmailNotUniqueError,
  IncorrectPasswordError,
  UserNotFoundError,
} from './auth.service.errors';
import { SignUpResponseDto } from './dto/signup.response.dto';
import { LogInResponseDto } from './dto/login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public async signUp(@Body() data: SignUpRequestDto) {
    const [result, error] = await this.authService.signUp(data);

    if (error && error instanceof EmailNotUniqueError) {
      throw new UnauthorizedException('email-not-unique');
    }

    return new SignUpResponseDto(result!);
  }

  @Post('/login')
  public async logIn(@Body() data: LogInRequestDto) {
    const [result, error] = await this.authService.logIn(data);

    if (error && error instanceof UserNotFoundError) {
      throw new UnauthorizedException('user-not-found');
    }

    if (error && error instanceof IncorrectPasswordError) {
      throw new UnauthorizedException('incorrect-password');
    }

    return new LogInResponseDto(result!);
  }
}
