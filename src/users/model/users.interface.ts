import { Document, Schema } from 'mongoose';
/**
 *
 *
 * @export
 * @interface UsersDocument
 * @extends {Document}
 *
 * @author smpham
 */
export interface UsersDocument extends Document {
  id?: string | Schema.Types.ObjectId;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  avatar?: string;
  phone?: string;
  roleId?: string | Schema.Types.ObjectId;
  updatedAt?: Date;
}
