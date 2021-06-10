import { ILoggerService } from './logger.service';
import * as logger from 'signale';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SneakerLogger implements ILoggerService {
  constructor() {
    logger.config({
      displayTimestamp: true,
      displayDate: true,
    });
  }
  success(message: string): void {
    logger.success(message);
  }
  log(message: string): void {
    logger.info(message);
  }
  error(message: string, trace?: string): void {
    logger.error(message, trace);
  }
  warn(message: string): void {
    logger.warn(message);
  }
  debug(message: string): void {
    logger.debug(message);
  }
  verbose(message: string): void {
    logger.verbose(message);
  }
}
