import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from 'src/roles/roles.module';
import { UsersSchema } from './model/users.schema';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    RolesModule,
  ],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
