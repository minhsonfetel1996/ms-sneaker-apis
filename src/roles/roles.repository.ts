import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/repositories/BaseRepository';
import { RolesDocument } from './model/roles.interface';
/**
 *
 * @export
 * @class RolesRepository
 * @extends {BaseRepository<RolesDocument>}
 *
 * @author smpham
 */
@Injectable()
export class RolesRepository extends BaseRepository<RolesDocument> {
  constructor(@InjectModel('Roles') readonly roleModel: Model<RolesDocument>) {
    super(roleModel);
  }
}
