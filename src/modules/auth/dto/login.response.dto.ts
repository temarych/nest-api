import { ApiProperty } from '@nestjs/swagger';

export class LogInResponseDto {
  @ApiProperty()
  public accessToken: string;

  constructor(data: LogInResponseDto) {
    this.accessToken = data.accessToken;
  }
}
