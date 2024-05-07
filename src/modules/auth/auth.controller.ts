import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiErrorCode } from '@typings/ApiErrorCode';
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
  @ApiOperation({
    summary: 'Sign up',
    operationId: 'signup',
    tags: ['auth'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: SignUpResponseDto,
  })
  public async signUp(@Body() data: SignUpRequestDto) {
    const [result, error] = await this.authService.signUp(data);

    if (error && error instanceof EmailNotUniqueError) {
      throw new UnauthorizedException(ApiErrorCode.EmailNotUnique);
    }

    return new SignUpResponseDto(result!);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Log in',
    operationId: 'login',
    tags: ['auth'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: LogInResponseDto,
  })
  public async logIn(@Body() data: LogInRequestDto) {
    const [result, error] = await this.authService.logIn(data);

    if (error && error instanceof UserNotFoundError) {
      throw new UnauthorizedException(ApiErrorCode.UserNotFound);
    }

    if (error && error instanceof IncorrectPasswordError) {
      throw new UnauthorizedException(ApiErrorCode.IncorrectPassword);
    }

    return new LogInResponseDto(result!);
  }
}
