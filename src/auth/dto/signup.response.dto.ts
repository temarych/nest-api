import { Expose } from 'class-transformer';

@Expose()
export class SignUpResponseDto {
  public accessToken: string;

  constructor(data: SignUpResponseDto) {
    Object.assign(this, data);
  }
}
