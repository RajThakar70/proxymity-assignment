import { SignInUser } from './sign-in';
import { HTTPMethods } from 'fastify';
import { SignUpUser } from './sing-up';
import { SignInRequest, SignUpRequest } from '../../validations/authentication.validation';


export default [
  {
    method: 'POST' as HTTPMethods,
    schema: {
      body: SignInRequest
    },
    url: '/sign-in',
    handler: SignInUser.perform,
  },

  {
    method: 'POST' as HTTPMethods,
    schema: {
      body: SignUpRequest
    },
    url: '/sign-up',
    handler: SignUpUser.perform,
  },
];
