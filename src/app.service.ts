import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from './core/services/redis.service';
import { SneakerLogger } from './logger/sneaker-logger';
import { RolesDocument } from './roles/model/roles.interface';
import { RolesService } from './roles/roles.service';
import { UsersDocument } from './users/model/users.interface';
import { UsersService } from './users/users.service';
/**
 *
 *
 * @export
 * @class AppService
 * @implements {OnModuleInit}
 *
 * @author smpham
 */
@Injectable()
export class AppService implements OnModuleInit {
  private readonly REDLOCK_RESOURCE_KEY = 'ms-sneaker-apis-lock-key';

  constructor(
    private readonly redisService: RedisService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly sneakerLogger: SneakerLogger,
  ) {}

  async onModuleInit() {
    try {
      const redisMutexLock = this.redisService.createLock(
        this.REDLOCK_RESOURCE_KEY,
      );
      this.sneakerLogger.log('Lock redis');
      await redisMutexLock.lock();
      await this.initData();
      await redisMutexLock.unlock();
      this.sneakerLogger.log('Unlock redis');
    } catch (error) {
      this.sneakerLogger.error(error.message, error.trace);
      throw new Error(error);
    }
  }
  async initData() {
    this.sneakerLogger.log('Start init root data');
    let rootUser: UsersDocument = await this.usersService.getRootUser();
    if (rootUser) {
      this.sneakerLogger.log('Root data have initialized');
      return;
    }
    rootUser = await this.usersService.initRootUser();
    const rootRoles = [
      {
        name: 'Administrator',
        description: 'Administrator',
        type: 'ADMIN',
        createdBy: rootUser.id,
        updatedAt: Date.now(),
      },
      {
        name: 'SIMPLE_USER',
        description: 'Simple user',
        type: 'SIMPLE_USER',
        createdBy: rootUser.id,
        updatedAt: Date.now(),
      },
    ];
    this.sneakerLogger.log('Init root roles');
    const roles = [];
    for (let i = 0; i < rootRoles.length; i++) {
      const role = await this.rolesService.create(
        rootRoles[i] as RolesDocument,
      );
      roles.push(role);
    }
    rootUser.roleId = roles.filter((r) => r.type === 'ADMIN')[0].id;
    rootUser = await this.usersService.updateUser(rootUser);
    this.sneakerLogger.log('Finished init root data');
  }
}
