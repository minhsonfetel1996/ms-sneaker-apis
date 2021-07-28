import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Module({
  providers: [LocalAuthGuard, JwtAuthGuard],
  exports: [LocalAuthGuard, JwtAuthGuard],
})
export class SharedModule {}
