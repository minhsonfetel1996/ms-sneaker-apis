import { JwtAuthGuard } from './../shared/guards/jwt.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
