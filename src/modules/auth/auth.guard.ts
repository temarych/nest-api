import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiErrorCode } from '@typings/ApiErrorCode';
import { AuthService } from './auth.service';
import {
  AccessTokenExpiredError,
  AccessTokenInvalidError,
  UserNotFoundError,
} from './auth.service.errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractAccessTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException(ApiErrorCode.NoAccessToken);
    }

    const [result, error] = await this.authService.authorize({ accessToken });

    if (error && error instanceof AccessTokenExpiredError) {
      throw new UnauthorizedException(ApiErrorCode.ExpiredAccessToken);
    }

    if (error && error instanceof AccessTokenInvalidError) {
      throw new UnauthorizedException(ApiErrorCode.InvalidAccessToken);
    }

    if (error && error instanceof UserNotFoundError) {
      throw new UnauthorizedException(ApiErrorCode.UserNotFound);
    }

    request['user'] = result!.user;

    return true;
  }

  private extractAccessTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
