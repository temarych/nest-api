import { ApiProperty } from '@nestjs/swagger';
import { ApiErrorCause } from './ApiErrorCause';

export class ApiErrorDto {
  @ApiProperty({ example: 400 })
  public statusCode: number;

  @ApiProperty({
    enum: ApiErrorCause,
    example: ApiErrorCause.EmailNotUnique,
  })
  public cause: ApiErrorCause;

  @ApiProperty({ example: 'Email not unique' })
  public message: string;
}
