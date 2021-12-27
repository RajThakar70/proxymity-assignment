import { FastifyRequest, FastifyReply } from 'fastify';
import Lesson from '../../models/lesson.model';

import { errorBuilder, responseBuilder } from '../../utils/builders';

export class GetActiveLessons {
  public static async perform(
    req: FastifyRequest<{ Querystring: { courseId: string } }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { courseId } = req.query;

      const lessonList = await Lesson.find({ isActive: true, courseIds: courseId });

      if (!lessonList.length) {
        rep.code(404);
        return errorBuilder('no lesson found');
      }
      rep.code(200);
      return responseBuilder(lessonList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}
