import { FastifyRequest, FastifyReply } from 'fastify';
import Video from '../../models/video.model';
// import Video from '../../models/video.model';
import { errorBuilder, responseBuilder } from '../../utils/builders';

export class CreateVideo {
  public static async perform(
    req: FastifyRequest<{ Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description, lessonIds, tagIds, link } = req.body;
      
      console.log("🚀 ~ file: video-crud.ts ~ line 14 ~ CreateVideo ~ req.headers", req.headers)

      const videoDB = new Video({
        name,
        description,
        lessonIds,
        tagIds,
        link,
        viewCount: 0,
      });

      await videoDB.save();

      rep.code(201);
      return responseBuilder(videoDB._id);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class UpdateVideo {
  public static async perform(
    req: FastifyRequest<{ Params: { videoId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { name, description, lessonIds, tagIds, link } = req.body;

      const { videoId } = req.params;

      const foundVideo = await Video.findOne({ _id: videoId });

      if (name) {
        foundVideo.name = name;
      }

      if (description) {
        foundVideo.description = description;
      }

      if (lessonIds) {
        foundVideo.description = description;
      }

      if (tagIds) {
        foundVideo.description = description;
      }

      if (link) {
        foundVideo.description = description;
      }

      await foundVideo.save();
      rep.code(201);
      return responseBuilder('updated');
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetVideo {
  public static async perform(
    req: FastifyRequest<{ Params: { videoId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { videoId } = req.params;
      const video = await Video.findOne({ _id: videoId });
      if (!video) {
        rep.code(404);
        return errorBuilder('video not found');
      }
      video.viewCount += 1;
      await video.save();
      rep.code(200);
      return responseBuilder(video);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class GetVideos {
  public static async perform(
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const videoList = await Video.find({});
      rep.code(200);
      return responseBuilder(videoList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}

export class DeleteVideo {
  public static async perform(
    req: FastifyRequest<{ Params: { videoId: string }; Body: any }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { videoId } = req.params;

      const video = await Video.find({
        _id: videoId,
      });

      if (!video) {
        rep.code(422);
        return errorBuilder('Video not found');
      }

      const removedVideoResult = await Video.remove({ _id: videoId });

      if (!removedVideoResult.deletedCount) {
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
