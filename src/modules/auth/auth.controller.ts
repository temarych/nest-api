import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorCause } from '@typings/ApiErrorCause';
import { ApiErrorDto } from '@typings/ApiErrorDto';
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
  @ApiOkResponse({ type: SignUpResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async signUp(@Body() data: SignUpRequestDto) {
    const [result, error] = await this.authService.signUp(data);

    if (error && error instanceof EmailNotUniqueError) {
      throw new UnauthorizedException('Email not unique', {
        cause: ApiErrorCause.EmailNotUnique,
      });
    }

    return new SignUpResponseDto(result!);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Log in',
    operationId: 'login',
    tags: ['auth'],
  })
  @ApiOkResponse({ type: LogInResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async logIn(@Body() data: LogInRequestDto) {
    const [result, error] = await this.authService.logIn(data);

    if (error && error instanceof UserNotFoundError) {
      throw new UnauthorizedException('User not found', {
        cause: ApiErrorCause.UserNotFound,
      });
    }

    if (error && error instanceof IncorrectPasswordError) {
      throw new UnauthorizedException('Incorrect password', {
        cause: ApiErrorCause.IncorrectPassword,
      });
    }

    return new LogInResponseDto(result!);
  }
}
