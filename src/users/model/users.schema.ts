import { Schema } from 'mongoose';

export const UsersSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    avatar: { type: String },
    phone: { type: String, required: true },
    roleId: { type: Schema.Types.ObjectId, ref: 'Roles' },
    updatedAt: Date,
  },
  { timestamps: true },
);
