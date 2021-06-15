import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpInterceptor } from './core/interceptors/http.interceptor';
import { TimeoutInterceptor } from './core/interceptors/timeout.interceptor';
import { ConfigService } from './core/services/config.service';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    MongooseModule.forRootAsync({
      imports: [CoreModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: HttpInterceptor },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
