import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '9ff6e440-b01a-444e-9b94-a1d0538242dd' })
  public id: string;

  @ApiProperty({ example: 'Peter' })
  public firstName: string;

  @ApiProperty({ example: 'parker' })
  public lastName: string;

  @ApiProperty({ example: 'example@example.com' })
  public email: string;

  constructor(data: UserDto) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}
