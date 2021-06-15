import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/repositories/BaseRepository';
import { UsersDocument } from './model/users.interface';
/**
 *
 *
 * @export
 * @class UsersRepository
 * @extends {BaseRepository<UsersDocument>}
 *
 * @author smpham
 */
@Injectable()
export class UsersRepository extends BaseRepository<UsersDocument> {
  constructor(@InjectModel('Users') readonly usersModel: Model<UsersDocument>) {
    super(usersModel);
  }
}
