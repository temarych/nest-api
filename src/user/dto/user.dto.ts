export class UserDto {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(data: UserDto) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}
