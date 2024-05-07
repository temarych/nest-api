import { ApiProperty } from '@nestjs/swagger';

export class LogInResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsIn' })
  public accessToken: string;

  constructor(data: LogInResponseDto) {
    this.accessToken = data.accessToken;
  }
}
