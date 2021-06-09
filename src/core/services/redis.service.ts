import { Injectable, OnModuleInit } from '@nestjs/common';
import * as redis from 'redis';
import * as Redlock from 'redlock';
import { promisify } from 'util';
import { RedisMutexLock } from '../impls/redis-mutex-lock';
import { IMutexLock } from '../interfaces/mutex-lock.interface';
import { ConfigService } from './config.service';

@Injectable()
export class RedisService implements OnModuleInit {
  private redLock: Redlock;
  private client: redis.RedisClient;

  set;
  get;
  del;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.connectRedisDatabase();
    this.redLock = new Redlock([this.client], {
      driftFactor: 0.01, // multiplied by lock ttl to determine drift time
      retryCount: -1, // The max number of times Redlock will attempt to lock a resource before erroring
      retryDelay: 200, // The time in ms between attempts
      retryJitter: 200, // The max time in ms randomly added to retries
    });
  }

  private connectRedisDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client = redis.createClient(this.configService.get('REDIS_URI'));
      this.client.once('error', (error) => {
        reject(error);
      });

      this.client.once('connect', () => {
        this.set = promisify(this.client.set).bind(this.client);
        this.get = promisify(this.client.get).bind(this.client);
        this.del = promisify(this.client.del).bind(this.client);
        resolve();
      });
    });
  }

  createLock(resource: string): IMutexLock {
    return new RedisMutexLock(this.redLock, resource);
  }
}
