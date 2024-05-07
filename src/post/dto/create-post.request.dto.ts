import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Some title' })
  public title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Some description' })
  public description: string;
}
