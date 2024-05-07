import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async hash(data: string) {
    return await bcrypt.hash(data, parseInt(process.env.HASH_ROUNDS as string));
  }

  public async compare(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }
}
