import mongoose from 'mongoose';

import { ITags } from '../interfaces/ITags';

export interface ITagsModel extends ITags, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITagsModel>('Tag', TagSchema);
