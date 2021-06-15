import { JwtAuthGuard } from './guards/jwt.guard';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { LocalAuthGuard } from './guards/local.guard';

@Module({
  imports: [LoggerModule],
  providers: [LocalAuthGuard, JwtAuthGuard],
  exports: [LoggerModule, LocalAuthGuard, JwtAuthGuard],
})
export class SharedModule {}
