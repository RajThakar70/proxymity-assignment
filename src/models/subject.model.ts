import mongoose from 'mongoose';

import { ISubjects } from '../interfaces/ISubjects';

export interface ISubjectsModel extends ISubjects, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubjectsModel>('Subject', SubjectSchema);
