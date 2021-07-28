import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { BcryptService } from './services/bcrypt.service';
import { ConfigService } from './services/config.service';
import { RedisService } from './services/redis.service';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [ConfigService, RedisService, BcryptService],
  exports: [ConfigService, RedisService, BcryptService, LoggerModule],
})
export class CoreModule {}
