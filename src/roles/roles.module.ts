import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesSchema } from './model/roles.schema';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
/**
 *
 *
 * @export
 * @class RolesModule
 *
 * @author smpham
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Roles', schema: RolesSchema }]),
  ],
  providers: [RolesRepository, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
