import { UsersDocument } from './../users/model/users.interface';
import { BcryptService } from './../core/services/bcrypt.service';
import { ConfigService } from './../core/services/config.service';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SneakerLogger } from './../logger/sneaker-logger';
import { JwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly sneakerLogger: SneakerLogger,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    let user: UsersDocument = await this.usersService.getUser(email);
    if (!user) {
      this.sneakerLogger.error(`The email ${email} have not available`);
      throw new BadRequestException('Login unsuccessfully. Try again?');
    }

    const isMatchPassword = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isMatchPassword) {
      this.sneakerLogger.error('Invalid password with email: ' + email);
      throw new BadRequestException('Login unsuccessfully. Try again?');
    }

    user.updatedAt = new Date();
    user = await this.usersService.updateUser(user);

    if (!user) {
      throw new BadRequestException('Login unsuccessfully. Try again?');
    }

    const jwtPayload: JwtPayload = {
      username: user.email,
      updatedAt: user.updatedAt,
    };

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: this.jwtService.sign(jwtPayload, {
        expiresIn: parseInt(
          this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
          10,
        ),
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      }),
    };
  }
}
