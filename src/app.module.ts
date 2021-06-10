import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './core/services/config.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { CoreModule } from './core/core.module';
import { LoggerModule } from './logger/logger.module';
import { ProductsModule } from './products/products.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from './core/interceptors/http.interceptor';
import { TimeoutInterceptor } from './core/interceptors/timeout.interceptor';

@Module({
  imports: [
    CoreModule,
    LoggerModule,
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
