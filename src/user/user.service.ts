import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(data: Omit<User, 'id' | 'posts'>): Promise<User> {
    return await this.userRepository.save(data);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  public async isEmailUnique(email: string) {
    const isEmailUsed = await this.userRepository.existsBy({ email });
    return !isEmailUsed;
  }

  public async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'password'>>,
  ): Promise<void> {
    await this.userRepository.update(id, data);
  }

  public async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
