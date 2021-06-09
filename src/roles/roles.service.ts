import { BadRequestException, Injectable } from '@nestjs/common';
import { Roles } from './model/roles.interface';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async create(role: Roles): Promise<Roles> {
    const data: Partial<Roles> = {
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
    return this.rolesRepository.create([data])[0];
  }

  async findAll(): Promise<Roles[]> {
    return this.rolesRepository.findAll({
      conditions: { type: { $ne: 'ADMIN' } },
    });
  }

  async findByType(type: string): Promise<Roles> {
    return this.rolesRepository.findOne({
      conditions: { type },
    });
  }
}
