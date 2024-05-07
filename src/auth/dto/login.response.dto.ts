import { Expose } from 'class-transformer';

@Expose()
export class LogInResponseDto {
  public accessToken: string;

  constructor(data: LogInResponseDto) {
    Object.assign(this, data);
  }
}
