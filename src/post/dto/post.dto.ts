export class PostDto {
  public id: string;
  public title: string;
  public description: string;
  public createdAt: Date;

  constructor(data: PostDto) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.createdAt = data.createdAt;
  }
}
