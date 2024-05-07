import { Injectable } from '@nestjs/common';
import { Result } from '@typings/Result';
import { UserService } from '@modules/user/user.service';
import { HashService } from './hash/hash.service';
import { JwtService } from './jwt/jwt.service';
import {
  AccessTokenExpiredError,
  AccessTokenInvalidError,
  EmailNotUniqueError,
  IncorrectPasswordError,
  UserNotFoundError,
} from './auth.service.errors';
import {
  IAuthorizeData,
  IAuthorizeResult,
  ILogInData,
  ILogInResult,
  ISignUpData,
  ISignUpResult,
} from './auth.service.types';
import { JwtExpiredError, JwtInvalidError } from './jwt/jwt.service.errors';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  public async signUp(
    data: ISignUpData,
  ): Promise<Result<ISignUpResult, Error>> {
    const isEmailUnique = await this.userService.isEmailUnique(data.email);

    if (!isEmailUnique) return [null, new EmailNotUniqueError()];

    const password = await this.hashService.hash(data.password);
    const user = await this.userService.create({ ...data, password });
    const accessToken = this.jwtService.sign({ id: user.id });

    return [{ accessToken }, null];
  }

  public async logIn(data: ILogInData): Promise<Result<ILogInResult, Error>> {
    const user = await this.userService.findOneByEmail(data.email);

    if (!user) return [null, new UserNotFoundError()];

    const isCorrectPassword = await this.hashService.compare(
      data.password,
      user.password,
    );

    if (!isCorrectPassword) return [null, new IncorrectPasswordError()];

    const accessToken = this.jwtService.sign({ id: user.id });

    return [{ accessToken }, null];
  }

  public async authorize(
    data: IAuthorizeData,
  ): Promise<Result<IAuthorizeResult, Error>> {
    const [payload, error] = this.jwtService.verify(data.accessToken);

    if (error && error instanceof JwtExpiredError) {
      return [null, new AccessTokenExpiredError()];
    }

    if (error && error instanceof JwtInvalidError) {
      return [null, new AccessTokenInvalidError()];
    }

    const user = await this.userService.findOne(payload!.id);

    if (!user) {
      return [null, new UserNotFoundError()];
    }

    return [{ user }, null];
  }
}
