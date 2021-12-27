import { FastifyRequest, FastifyReply } from 'fastify';
import Course from '../../models/course.model';
import Subscription from '../../models/subscription.model';

import { errorBuilder, responseBuilder } from '../../utils/builders';

export class UnsubscribeCourse {
  public static async perform(
    req: FastifyRequest<{ Params: { courseId: string } }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { courseId } = req.params;
      const { _id } = req.userDetails;

      const foundCourse = await Course.findOne({ _id: courseId });

      if (!foundCourse) {
        rep.code(404);
        return errorBuilder('no course found');
      }

      const foundSubscription = await Subscription.findOne({ userId: _id });

      if (!foundSubscription) {
        rep.code(404);
        return errorBuilder('no subscription found');
      }

      if (foundSubscription) {
        if (foundSubscription.courseIds.indexOf(courseId) === -1) {
          rep.code(422);
          return errorBuilder('not subscribe to this course');
        }
        foundSubscription.courseIds = foundSubscription.courseIds.filter((subscribedCourseId) => {
          return subscribedCourseId !== courseId;
        });
        foundSubscription.markModified('courseIds');
        await foundSubscription.save();
      } 

      rep.code(200);
      return responseBuilder('done');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}
