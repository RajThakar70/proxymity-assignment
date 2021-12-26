import mongoose from 'mongoose';

import { ISubscriptions } from '../interfaces/ISubscriptions';

export interface ISubscriptionsModel extends ISubscriptions, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courseIds: { type: Array, default: [], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubscriptionsModel>('Subscription', SubscriptionSchema);
