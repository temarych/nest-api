import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from './hash/hash.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, HashService, JwtService],
})
export class AuthModule {}
