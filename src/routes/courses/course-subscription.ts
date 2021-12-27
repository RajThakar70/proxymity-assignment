import { FastifyRequest, FastifyReply } from 'fastify';
import Course from '../../models/course.model';
import Subscription from '../../models/subscription.model';

import { errorBuilder, responseBuilder } from '../../utils/builders';

export class SubscribeCourse {
  public static async perform(
    req: FastifyRequest<{ Querystring: { courseId: string } }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { courseId } = req.query;
      const { _id } = req.userDetails;

      const foundCourse = await Course.findOne({ _id: courseId });

      if (!foundCourse) {
        rep.code(404);
        return errorBuilder('no course found');
      }

      const foundSubscription = await Subscription.findOne({ userId: _id });

      if (foundSubscription) {
        if (foundSubscription.courseIds.indexOf(courseId) !== -1) {
          rep.code(422);
          return errorBuilder('already subscribe to course');
        }
        foundSubscription.courseIds.push(courseId);
        foundSubscription.markModified('courseIds');
        await foundSubscription.save();
      } else {
        const userSubscription = new Subscription({
          userId: _id,
          courseIds: [courseId],
        });

        await userSubscription.save();
      }

      rep.code(200);
      return responseBuilder('done');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}
