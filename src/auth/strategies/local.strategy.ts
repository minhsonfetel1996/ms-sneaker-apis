import { SneakerLogger } from './../../logger/sneaker-logger';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly sneakerLogger: SneakerLogger,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<AuthDto> {
    const authDto = await this.authService.login(username, password);
    if (!authDto) {
      this.sneakerLogger.error('401 Unauthorized');
      throw new UnauthorizedException();
    }
    return authDto;
  }
}
