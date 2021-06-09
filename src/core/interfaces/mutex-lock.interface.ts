export interface IMutexLock {
  lock(): Promise<void>;

  unlock(): Promise<void>;
}
