import { CreateUser, UpdateUser, GetUser, DeleteUser } from './user-crud';
import { HTTPMethods } from 'fastify';
import { Auth } from '../../infrastructure/providers/Auth';
import { INSTRUCTORS } from '../../utils/constants';
import { CreateUserRequest } from '../../validations/user.validation';

export default [
  {
    method: 'POST' as HTTPMethods,
    url: '/user',
    schema: {
      body: CreateUserRequest,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: CreateUser.perform,
  },
  {
    method: 'PUT' as HTTPMethods,
    url: '/user/:userId',
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: UpdateUser.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/user',
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetUser.perform,
  },

  {
    method: 'DELETE' as HTTPMethods,
    url: '/user/:userId',
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: DeleteUser.perform,
  },
];
