import { SneakerLogger } from '../../logger/sneaker-logger';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly sneakerLogger: SneakerLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.originalUrl;
    return next.handle().pipe(
      tap(() => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        const delay = Date.now() - now;
        (statusCode === 200
          ? this.sneakerLogger.success
          : this.sneakerLogger.error)(
          `${statusCode} | [${method}] ${url} - ${delay}ms`,
        );
      }),
    );
  }
}
