import {
  CreateSubject,
  UpdateSubject,
  GetSubject,
  DeleteSubject,
  GetSubjects,
} from './subject-crud';
import { HTTPMethods } from 'fastify';
import {
  CreateSubjectRequest,
  DeleteSubjectRequestParams,
  GetSubjectRequestParams,
  UpdateSubjectRequest,
  UpdateSubjectRequestParams,
} from '../../validations/subject.validation';
import { INSTRUCTORS, STUDENTS } from '../../utils/constants';
import { Auth } from '../../infrastructure/providers/Auth';

export default [
  {
    method: 'POST' as HTTPMethods,
    url: '/subject',
    schema: {
      body: CreateSubjectRequest,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: CreateSubject.perform,
  },
  {
    method: 'PUT' as HTTPMethods,
    url: '/subject/:subjectId',
    schema: {
      body: UpdateSubjectRequest,
      params: UpdateSubjectRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: UpdateSubject.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/subjects',
    preHandler: [Auth.canUserAccess([INSTRUCTORS, STUDENTS])],
    handler: GetSubjects.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/subject/:subjectId',
    schema: {
      params: GetSubjectRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetSubject.perform,
  },
  {
    method: 'DELETE' as HTTPMethods,
    url: '/subject/:subjectId',
    schema: {
      params: DeleteSubjectRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: DeleteSubject.perform,
  },
];
