import mongoose from 'mongoose';

import { IUsers } from '../interfaces/IUsers';


export interface IUsersModel extends IUsers, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isInstructor: { type: Boolean, required: true },    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUsersModel>('User', UserSchema);
