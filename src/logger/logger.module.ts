import { Module } from '@nestjs/common';
import { SneakerLogger } from './sneaker-logger';

@Module({ providers: [SneakerLogger], exports: [SneakerLogger] })
export class LoggerModule {}
