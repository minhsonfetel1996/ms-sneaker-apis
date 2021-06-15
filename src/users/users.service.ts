import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/core/services/bcrypt.service';
import { ConfigService } from 'src/core/services/config.service';
import { UsersDocument } from './model/users.interface';
import { UsersRepository } from './users.repository';
/**
 *
 *
 * @export
 * @class UsersService
 *
 * @author smpham
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  getRootUser(): Promise<UsersDocument> {
    return this.usersRepository.findOne({
      conditions: { email: this.configService.getRootAccount().email },
    });
  }

  initRootUser(): Promise<UsersDocument> {
    return new Promise(async (resolve, reject) => {
      try {
        const rootPassword = await this.bcryptService.hash(
          this.configService.getRootAccount().password,
        );
        const newRootUser: Partial<UsersDocument> = {
          ...this.configService.getRootAccount(),
          password: rootPassword,
        };

        const root = await this.usersRepository.createOne(newRootUser);
        resolve(root);
      } catch (error) {
        reject(error);
      }
    });
  }

  async updateUser(user: UsersDocument) {
    return this.usersRepository.findByIdAndUpdate({
      id: user.id,
      update: user,
    });
  }

  async getUser(email: string): Promise<UsersDocument> {
    return this.usersRepository.findOne({ conditions: { email } });
  }
}
