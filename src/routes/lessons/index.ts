import {
  CreateLesson,
  UpdateLesson,
  GetLesson,
  DeleteLesson,
  GetLessons,
} from './lesson-crud';
import { HTTPMethods } from 'fastify';
import {
  CreateLessonRequest,
  DeleteLessonRequestParams,
  GetActiveLessonsQuery,
  GetLessonRequestParams,
  UpdateLessonRequest,
  UpdateLessonRequestParams,
} from '../../validations/lesson.validation';
import { GetActiveLessons } from './get-active-lessons';
import { INSTRUCTORS, STUDENTS } from '../../utils/constants';
import { Auth } from '../../infrastructure/providers/Auth';

export default [
  {
    method: 'POST' as HTTPMethods,
    url: '/lesson',
    schema: {
      body: CreateLessonRequest,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: CreateLesson.perform,
  },
  {
    method: 'PUT' as HTTPMethods,
    url: '/lesson/:lessonId',
    schema: {
      body: UpdateLessonRequest,
      params: UpdateLessonRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: UpdateLesson.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/lessons',
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetLessons.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/lesson/:lessonId',
    schema: {
      params: GetLessonRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetLesson.perform,
  },
  {
    method: 'DELETE' as HTTPMethods,
    url: '/lesson/:lessonId',
    schema: {
      params: DeleteLessonRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: DeleteLesson.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/lesson/active',
    schema: {
      params: GetActiveLessonsQuery
    },
    preHandler: [Auth.canUserAccess([STUDENTS])],
    handler: GetActiveLessons.perform,
  },
];
