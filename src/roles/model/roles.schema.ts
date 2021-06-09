import { Schema } from 'mongoose';

export const RolesSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, default: 'SIMPLE_USER' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
    updatedAt: Date,
  },
  { timestamps: true },
);
