import { Document, Schema } from 'mongoose';

export interface Users extends Document {
  id?: string | Schema.Types.ObjectId;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  avatar?: string;
  phone?: string;
  roleId?: string | Schema.Types.ObjectId;
}
