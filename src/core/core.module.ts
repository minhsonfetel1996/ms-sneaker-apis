import { Global, Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { ConfigService } from './services/config.service';
import { RedisService } from './services/redis.service';

@Global()
@Module({
  providers: [ConfigService, RedisService, BcryptService],
  exports: [ConfigService, RedisService, BcryptService],
})
export class CoreModule {}
