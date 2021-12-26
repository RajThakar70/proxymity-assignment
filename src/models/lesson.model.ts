import mongoose from 'mongoose';

import { ILessons } from '../interfaces/ILessons';

export interface ILessonsModel extends ILessons, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    courseIds: { type: Array, default: [], required: true },
    isActive: { type: Boolean, required: true }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILessonsModel>('Lesson', LessonSchema);
