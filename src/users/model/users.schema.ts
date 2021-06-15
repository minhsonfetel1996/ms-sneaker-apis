import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Roles } from 'src/roles/model/roles.schema';
/**
 *
 *
 * @export
 * @class Users
 *
 * @author smpham
 */
@Schema()
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  avatar: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Roles' })
  roleId: Roles;

  @Prop({ required: true })
  updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
