import mongoose from 'mongoose';

import { ICourses } from '../interfaces/ICourses';

export interface ICoursesModel extends ICourses, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    subjectIds: { type: Array, default: [], required: true },
    isActive: { type: Boolean, required: true },
    viewCount: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICoursesModel>('Course', CourseSchema);
