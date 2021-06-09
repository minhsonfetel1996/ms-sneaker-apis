import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from './core/services/config.service';
import { RedisService } from './core/services/redis.service';
import { Roles } from './roles/model/roles.interface';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly REDLOCK_RESOURCE_KEY = 'ms-sneaker-apis-lock-key';

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async onModuleInit() {
    // TODO
    try {
      const redisMutexLock = this.redisService.createLock(
        this.REDLOCK_RESOURCE_KEY,
      );
      await redisMutexLock.lock();
      await this.initData();
      await redisMutexLock.unlock();
    } catch (error) {
      throw new Error(error);
    }
  }
  async initData() {
    const isInitializedUser = await this.usersService.getRootUser();
    if (isInitializedUser) {
      return;
    }
    let rootUser = await this.usersService.initRootUser();

    console.log(JSON.stringify(rootUser));

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

    console.log('Init root roles');
    for (let i = 0; i < rootRoles.length; i++) {
      await this.rolesService.create(rootRoles[i] as Roles);
    }

    const adminRole = await this.rolesService.findByType('ADMIN');
    rootUser.roleId = adminRole.id;
    rootUser = this.usersService.updateUser(rootUser);
  }
}
