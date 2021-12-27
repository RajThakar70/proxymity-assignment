import {
  CreateVideo,
  UpdateVideo,
  GetVideo,
  DeleteVideo,
  GetVideos,
} from './video-crud';
import { HTTPMethods } from 'fastify';
import {
  CreateVideoRequest,
  DeleteVideoRequestParams,
  GetActiveVideosQuery,
  GetVideoRequestParams,
  UpdateVideoRequest,
  UpdateVideoRequestParams,
} from '../../validations/video.validation';
import { AuthHeader } from '../../validations';
import { GetActiveVideos } from './get-active-videos';
import { INSTRUCTORS, STUDENTS } from '../../utils/constants';
import { Auth } from '../../infrastructure/providers/Auth';

export default [
  {
    method: 'POST' as HTTPMethods,
    url: '/video',
    schema: {
      body: CreateVideoRequest,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: CreateVideo.perform,
  },
  {
    method: 'PUT' as HTTPMethods,
    url: '/video/:videoId',
    schema: {
      body: UpdateVideoRequest,
      params: UpdateVideoRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: UpdateVideo.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/videos',
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetVideos.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/video/:videoId',
    schema: {
      params: GetVideoRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetVideo.perform,
  },
  {
    method: 'DELETE' as HTTPMethods,
    url: '/video/:videoId',
    schema: {
      params: DeleteVideoRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: DeleteVideo.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/video/active',
    schema: {
      querystring: GetActiveVideosQuery,
    },
    preHandler: [Auth.canUserAccess([STUDENTS])],
    handler: GetActiveVideos.perform,
  },
];
