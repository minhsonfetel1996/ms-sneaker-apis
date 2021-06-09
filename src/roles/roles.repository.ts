import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/repositories/BaseRepository';
import { Roles } from './model/roles.interface';

@Injectable()
export class RolesRepository extends BaseRepository<Roles> {
  constructor(@InjectModel('Roles') readonly roleModel: Model<Roles>) {
    super(roleModel);
  }
}
