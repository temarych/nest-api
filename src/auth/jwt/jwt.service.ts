import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { Result } from '@/typings/result';
import { IJwtPayload } from './jwt.service.types';
import { JwtExpiredError, JwtInvalidError } from './jwt.service.errors';

@Injectable()
export class JwtService {
  public sign(payload: IJwtPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  public verify(token: string): Result<IJwtPayload, Error> {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as IJwtPayload;

      return [payload, null];
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return [null, new JwtExpiredError()];
      }

      if (error instanceof JsonWebTokenError) {
        return [null, new JwtInvalidError()];
      }

      return [null, error];
    }
  }
}
