import { User } from '@/user/entities/user.entity';

export interface ISignUpData extends Omit<User, 'id' | 'posts'> {}
export interface ILogInData extends Pick<User, 'email' | 'password'> {}

export interface ISignUpResult {
  accessToken: string;
}

export interface ILogInResult {
  accessToken: string;
}

export interface IAuthorizeData {
  accessToken: string;
}

export interface IAuthorizeResult {
  user: User;
}
