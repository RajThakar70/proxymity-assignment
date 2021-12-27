import { FastifyRequest, FastifyReply } from 'fastify';
import Subject from '../../models/subject.model';
import Course from '../../models/course.model';
import { errorBuilder, responseBuilder } from '../../utils/builders';

export class CreateSubject {
  public static async perform(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description } = req.body;

      const subjectDB = new Subject({
        name,
        description,
      });

      await subjectDB.save();

      rep.code(201);
      return responseBuilder(subjectDB._id);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class UpdateSubject {
  public static async perform(
    req: FastifyRequest<{ Params: { subjectId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description } = req.body;

      const { subjectId } = req.params;

      const foundSubject = await Subject.findOne({ _id: subjectId });

      if (name) {
        foundSubject.name = name;
      }

      if (description) {
        foundSubject.description = description;
      }

      await foundSubject.save();
      rep.code(201);
      return responseBuilder('updated');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetSubject {
  public static async perform(
    req: FastifyRequest<{ Params: { subjectId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { subjectId } = req.params;
      const subject = await Subject.findOne({ _id: subjectId });
      if (!subject) {
        rep.code(404);
        return errorBuilder('subject not found');
      }
      rep.code(200);
      return responseBuilder(subject);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetSubjects {
  public static async perform(
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const subjectList = await Subject.find({});
      rep.code(200);
      return responseBuilder(subjectList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class DeleteSubject {
  public static async perform(
    req: FastifyRequest<{ Params: { subjectId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { subjectId } = req.params;

      const subject = await Subject.find({
        _id: subjectId,
      });

      if (!subject) { 
        rep.code(422);
        return errorBuilder('Subject not found');
      }

      const courseList = await Course.find({ subjectIds: subjectId });

      await Promise.all(
        courseList.map(async (course) => {
          course.subjectIds = course.subjectIds.filter((courseSubject) => {
            return courseSubject !== subjectId;
          });

          await course.save();
          return course;
        })
      );

      const removedSubjectResult = await Subject.remove({ _id: subjectId });

      if (!removedSubjectResult.deletedCount) {
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
