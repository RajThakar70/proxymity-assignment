import mongoose from 'mongoose';

import { IVideos } from '../interfaces/IVideos';

export interface IVideosModel extends IVideos, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    lessonIds: { type: Array, default: [], required: true },
    tagIds: { type: Array, default: [], required: true },
    link: { type: String, required: true },
    viewCount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVideosModel>('Video', VideoSchema);
