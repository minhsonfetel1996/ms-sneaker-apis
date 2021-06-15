import { JwtAuthGuard } from './../shared/guards/jwt.guard';
import { LocalAuthGuard } from './../shared/guards/local.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AuthDto> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
