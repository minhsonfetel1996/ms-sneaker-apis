import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/repositories/BaseRepository';
import { Users } from './model/users.interface';

@Injectable()
export class UsersRepository extends BaseRepository<Users> {
  constructor(@InjectModel('Users') readonly usersModel: Model<Users>) {
    super(usersModel);
  }
}
