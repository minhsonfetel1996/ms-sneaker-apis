import { IMutexLock } from '../interfaces/mutex-lock.interface';
import * as Redlock from 'redlock';

export class RedisMutexLock implements IMutexLock {
  private readonly redLock: Redlock;
  private readonly resource: string;
  private lockObj: Redlock.Lock;

  constructor(
    private readonly redLockIns: Redlock,
    private readonly resourceName: string,
  ) {
    this.redLock = redLockIns;
    this.resource = resourceName;
  }

  async lock(): Promise<void> {
    this.lockObj = await this.redLock.lock(`locks:${this.resource}`, 2000);
    return Promise.resolve();
  }
  unlock(): Promise<void> {
    if (!this.lockObj) {
      return Promise.reject();
    }
    return this.redLock.unlock(this.lockObj);
  }
}
