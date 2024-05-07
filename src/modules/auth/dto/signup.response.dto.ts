import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsIn' })
  public accessToken: string;

  constructor(data: SignUpResponseDto) {
    this.accessToken = data.accessToken;
  }
}
