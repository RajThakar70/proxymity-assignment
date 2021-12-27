import { FastifyRequest, FastifyReply } from 'fastify';
import Course from '../../models/course.model';

import { errorBuilder, responseBuilder } from '../../utils/builders';

export class GetActiveCourses {
  public static async perform(
    req: FastifyRequest<{ Querystring: { subjectId?: string } }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { subjectId } = req.query;

      const query: any = {
        isActive: true,
      };

      if (subjectId) {
        query.subjectIds = subjectId;
      }

      const courseList = await Course.find(query);

      if (!courseList.length) {
        rep.code(404);
        return errorBuilder('no course found');
      }
      rep.code(200);
      return responseBuilder(courseList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}
