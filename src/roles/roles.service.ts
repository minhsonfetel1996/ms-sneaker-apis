import { BadRequestException, Injectable } from '@nestjs/common';
import { RolesDocument } from './model/roles.interface';
import { RolesRepository } from './roles.repository';
/**
 *
 * @export
 * @class RolesService
 *
 * @author smpham
 */
@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async create(role: RolesDocument): Promise<RolesDocument> {
    const data: Partial<RolesDocument> = {
      ...role,
    };

    const roleFromDB = await this.rolesRepository.findOne({
      conditions: {
        name: data.name,
      },
    });
    if (roleFromDB) {
      throw new BadRequestException(roleFromDB);
    }
    return this.rolesRepository.createOne(data);
  }

  findAll(): Promise<RolesDocument[]> {
    return this.rolesRepository.findAll({
      conditions: { type: { $ne: 'ADMIN' } },
    });
  }

  findByType(type: string): Promise<RolesDocument> {
    return this.rolesRepository.findOne({
      conditions: { type: type },
    });
  }
}
