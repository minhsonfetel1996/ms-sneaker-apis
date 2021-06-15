import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from 'src/users/model/users.schema';
/**
 *
 * @export
 * @class Roles
 *
 * @author smpham
 */
@Schema()
export class Roles {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: 'SIMPLE_USER' })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' })
  createdBy: Users;

  @Prop({ required: true })
  updatedAt: Date;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
