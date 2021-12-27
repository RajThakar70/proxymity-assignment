import { FastifyRequest, FastifyReply } from 'fastify';
import Video from '../../models/video.model';
import Tag from '../../models/tag.model';

import { errorBuilder, responseBuilder } from '../../utils/builders';

export class GetActiveVideos {
  public static async perform(
    req: FastifyRequest<{ Querystring: { lessonId: string; videoName?: string, tagNames?: string } }>,
    rep: FastifyReply
  ): Promise<any> {
    try {
      const { lessonId, videoName, tagNames } = req.query;

      const tagNamesArray = tagNames.split(',');

      const query: any = {
        isActive: true,
        lessonIds: lessonId
      };

      if(videoName){
        query['$regex'] = videoName;
        query['$options'] = 'i'
      }

      if(tagNames.length){
        const tagList = await Tag.find({ name: { $in: [ ...tagNamesArray ] }});
        query.tagIds = tagList.map((tag) => {
          return tag._id.toString();
        })
      }

      const videoList = await Video.find(query);

      if (!videoList.length) {
        rep.code(404);
        return errorBuilder('no video found');
      }
      rep.code(200);
      return responseBuilder(videoList);
    } catch (err) {
      rep.code(500);
      return err;
    }
  }
}
