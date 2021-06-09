import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/core/services/bcrypt.service';
import { ConfigService } from 'src/core/services/config.service';
import { Users } from './model/users.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  getRootUser(): Promise<Users> {
    return this.usersRepository.findOne({
      conditions: { email: this.configService.get('ROOT_USER_EMAIL') },
    });
  }

  async initRootUser() {
    const rootPassword = await this.bcryptService.hash(
      this.configService.get('ROOT_USER_DEFAULT_PASSWORD'),
    );
    const root = await this.usersRepository.create([
      {
        email: this.configService.get('ROOT_USER_EMAIL'),
        password: rootPassword,
        firstName: 'Admin',
        lastName: 'Sneaker',
        address: 'Sneaker shop',
        phone: '123456789',
      },
    ])[0];
    return root;
  }

  async updateUser(user: Users) {
    return this.usersRepository.findByIdAndUpdate({
      id: user.id,
      update: user,
    });
  }
}
