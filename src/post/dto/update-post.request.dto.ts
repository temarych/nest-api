import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatePostRequestDto {
  @IsOptional()
  @ApiProperty({ required: false, example: 'Some title' })
  public title?: string;

  @IsOptional()
  @ApiProperty({ required: false, example: 'Some description' })
  public description?: string;
}
