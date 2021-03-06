import { Schema, Document } from 'mongoose';
/**
 *
 * @export
 * @interface RolesDocument
 * @extends {Document}
 *
 * @author smpham
 */
export interface RolesDocument extends Document {
  readonly id?: string | Schema.Types.ObjectId;
  readonly name?: string;
  readonly description?: string;
  readonly type?: string;
  readonly createdBy?: string | Schema.Types.ObjectId;
  readonly updatedAt?: Date | number;
}
