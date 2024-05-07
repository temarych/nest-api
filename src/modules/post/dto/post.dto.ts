import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@modules/user/dto/user.dto';

export class PostDto {
  @ApiProperty({ example: '9ff6e440-b01a-444e-9b94-a1d0538242dd' })
  public id: string;

  @ApiProperty({ example: 'Some title' })
  public title: string;

  @ApiProperty({ example: 'Some description' })
  public description: string;

  @ApiProperty({ example: '2018-03-20T09:12:28Z' })
  public createdAt: Date;

  @ApiProperty()
  public author: UserDto;

  constructor(data: PostDto) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.author = new UserDto(data.author);
  }
}
