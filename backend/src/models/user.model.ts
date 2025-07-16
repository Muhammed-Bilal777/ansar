import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone?: string;
  avatar?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    phone: {
      type: String,
    },

    avatar: {
      type: String, // URL or base64
    },

    address: addressSchema,

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
