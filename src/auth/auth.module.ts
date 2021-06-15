import { ConfigService } from 'src/core/services/config.service';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from 'src/core/core.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          algorithm: 'HS512',
          expiresIn: parseInt(
            configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
            10,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
