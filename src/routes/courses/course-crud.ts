import { FastifyRequest, FastifyReply } from 'fastify';
import Course from '../../models/course.model';
import Lesson from '../../models/lesson.model';
import Subscription from '../../models/subscription.model';

import { errorBuilder, responseBuilder } from '../../utils/builders';

export class CreateCourse {
  public static async perform(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description = "", subjectIds, isActive } = req.body;

      const courseDB = new Course({
        name,
        description,
        subjectIds,
        isActive,
        viewCount: 0
      });

      await courseDB.save();

      rep.code(201);
      return responseBuilder(courseDB._id);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class UpdateCourse {
  public static async perform(
    req: FastifyRequest<{ Params: { courseId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description, subjectIds, isActive } = req.body;

      const { courseId } = req.params;

      const foundCourse = await Course.findOne({ _id: courseId });

      if (name) {
        foundCourse.name = name;
      }

      if (description) {
        foundCourse.description = description;
      }

      if (subjectIds) {
        foundCourse.subjectIds = subjectIds;
      }

      if (typeof isActive === 'boolean') {
        foundCourse.isActive = isActive;
      }

      await foundCourse.save();
      rep.code(201);
      return responseBuilder('updated');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetCourse {
  public static async perform(
    req: FastifyRequest<{ Params: { courseId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { courseId } = req.params;
      const course = await Course.findOne({ _id: courseId });
      if (!course) {
        rep.code(404);
        return errorBuilder('course not found');
      }
      course.viewCount += 1;
      await course.save();
      rep.code(200);
      return responseBuilder(course);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetCourses {
  public static async perform(
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const courseList = await Course.find({});
      rep.code(200);
      return responseBuilder(courseList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class DeleteCourse {
  public static async perform(
    req: FastifyRequest<{ Params: { courseId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { courseId } = req.params;

      const course = await Course.find({
        _id: courseId,
      });

      if (!course) {
        rep.code(422);
        return errorBuilder('Course not found');
      }

      const lessonList = await Lesson.find({ courseIds: courseId });

      await Promise.all(
        lessonList.map(async (lesson) => {
          lesson.courseIds = lesson.courseIds.filter((lessonCourse) => {
            return lessonCourse !== courseId;
          });

          await lesson.save();
          return lesson;
        })
      );

      const subscriptionList = await Subscription.find({ courseIds: courseId });

      await Promise.all(
        subscriptionList.map(async (subscription) => {
          subscription.courseIds = subscription.courseIds.filter((subscriptionCourse) => {
            return subscriptionCourse !== courseId;
          });

          await subscription.save();
          return subscription;
        })
      );

      const removedCourseResult = await Course.remove({ _id: courseId });

      if (!removedCourseResult.deletedCount) {
        rep.code(404);
        return errorBuilder('Not Found!');
      }

      rep.code(200);
      return responseBuilder('Deleted');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}
