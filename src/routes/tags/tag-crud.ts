import { FastifyRequest, FastifyReply } from 'fastify';
import Tag from '../../models/tag.model';
import Video from '../../models/video.model';
import { errorBuilder, responseBuilder } from '../../utils/builders';

export class CreateTag {
  public static async perform(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description } = req.body;

      const tagDB = new Tag({
        name,
        description,
      });

      await tagDB.save();

      rep.code(201);
      return responseBuilder(tagDB._id);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class UpdateTag {
  public static async perform(
    req: FastifyRequest<{ Params: { tagId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description } = req.body;

      const { tagId } = req.params;

      const foundTag = await Tag.findOne({ _id: tagId });

      if (name) {
        foundTag.name = name;
      }

      if (description) {
        foundTag.description = description;
      }

      await foundTag.save();
      rep.code(201);
      return responseBuilder('updated');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetTag {
  public static async perform(
    req: FastifyRequest<{ Params: { tagId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { tagId } = req.params;
      const tag = await Tag.findOne({ _id: tagId });
      if (!tag) {
        rep.code(404);
        return errorBuilder('tag not found');
      }
      rep.code(200);
      return responseBuilder(tag);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetTags {
  public static async perform(
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const tagList = await Tag.find({});
      rep.code(200);
      return responseBuilder(tagList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class DeleteTag {
  public static async perform(
    req: FastifyRequest<{ Params: { tagId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { tagId } = req.params;

      const tag = await Tag.find({
        _id: tagId,
      });

      if (!tag) {
        rep.code(422);
        return errorBuilder('Tag not found');
      }

      const videoList = await Video.find({ tagIds: tagId });

      await Promise.all(
        videoList.map(async (video) => {
          video.tagIds = video.tagIds.filter((videoTag) => {
            return videoTag !== tagId;
          });

          await video.save();
          return video;
        })
      );

      const removedTagResult = await Tag.remove({ _id: tagId });

      if (!removedTagResult.deletedCount) {
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
