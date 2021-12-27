import { FastifyRequest, FastifyReply } from 'fastify';
import Lesson from '../../models/lesson.model';
import Video from '../../models/video.model';

import { errorBuilder, responseBuilder } from '../../utils/builders';

export class CreateLesson {
  public static async perform(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description, courseIds, isActive } = req.body;

      const lessonDB = new Lesson({
        name,
        description,
        courseIds,
        isActive
      });

      await lessonDB.save();

      rep.code(201);
      return responseBuilder(lessonDB._id);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class UpdateLesson {
  public static async perform(
    req: FastifyRequest<{ Params: { lessonId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description, courseIds, isActive } = req.body;

      const { lessonId } = req.params;

      const foundLesson = await Lesson.findOne({ _id: lessonId });

      if (name) {
        foundLesson.name = name;
      }

      if (description) {
        foundLesson.description = description;
      }

      if (courseIds) {
        foundLesson.courseIds = courseIds;
      }

      if (typeof isActive === 'boolean') {
        foundLesson.isActive = isActive;
      }

      await foundLesson.save();
      rep.code(201);
      return responseBuilder('updated');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetLesson {
  public static async perform(
    req: FastifyRequest<{ Params: { lessonId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { lessonId } = req.params;
      const lesson = await Lesson.findOne({ _id: lessonId });
      if (!lesson) {
        rep.code(404);
        return errorBuilder('lesson not found');
      }
      rep.code(200);
      return responseBuilder(lesson);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetLessons {
  public static async perform(
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const lessonList = await Lesson.find({});
      rep.code(200);
      return responseBuilder(lessonList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class DeleteLesson {
  public static async perform(
    req: FastifyRequest<{ Params: { lessonId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { lessonId } = req.params;

      const lesson = await Lesson.find({
        _id: lessonId,
      });

      if (!lesson) {
        rep.code(422);
        return errorBuilder('Lesson not found');
      }

      const videoList = await Video.find({ lessonIds: lessonId });

      await Promise.all(
        videoList.map(async (video) => {
          video.lessonIds = video.lessonIds.filter((videoTag) => {
            return videoTag !== lessonId;
          });

          await video.save();
          return video;
        })
      );

      const removedLessonResult = await Lesson.remove({ _id: lessonId });

      if (!removedLessonResult.deletedCount) {
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
