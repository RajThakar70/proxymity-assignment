import {
  CreateTag,
  UpdateTag,
  GetTag,
  DeleteTag,
  GetTags,
} from './tag-crud';
import { HTTPMethods } from 'fastify';
import {
  CreateTagRequest,
  DeleteTagRequestParams,
  GetTagRequestParams,
  UpdateTagRequest,
  UpdateTagRequestParams,
} from '../../validations/tag.validation';
import { Auth } from '../../infrastructure/providers/Auth';
import { INSTRUCTORS } from '../../utils/constants';

export default [
  {
    method: 'POST' as HTTPMethods,
    url: '/tag',
    schema: {
      body: CreateTagRequest,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: CreateTag.perform,
  },
  {
    method: 'PUT' as HTTPMethods,
    url: '/tag/:tagId',
    schema: {
      body: UpdateTagRequest,
      params: UpdateTagRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: UpdateTag.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/tags',
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetTags.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/tag/:tagId',
    schema: {
      params: GetTagRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetTag.perform,
  },
  {
    method: 'DELETE' as HTTPMethods,
    url: '/tag/:tagId',
    schema: {
      params: DeleteTagRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: DeleteTag.perform,
  },
];
