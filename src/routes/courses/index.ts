import {
  CreateCourse,
  UpdateCourse,
  GetCourse,
  DeleteCourse,
  GetCourses,
} from './course-crud';
import { HTTPMethods } from 'fastify';
import {
  CreateCourseRequest,
  DeleteCourseRequestParams,
  GetActiveCourseQuery,
  GetCourseRequestParams,
  SubscribeToCourseParams,
  UnsubscribeToCourseParams,
  UpdateCourseRequest,
  UpdateCourseRequestParams,
} from '../../validations/course.validation';
import { GetActiveCourses } from './get-active-courses';
import { SubscribeCourse } from './course-subscription';
import { UnsubscribeCourse } from './course-unsubscription';
import { Auth } from '../../infrastructure/providers/Auth';
import { INSTRUCTORS, STUDENTS } from '../../utils/constants';

export default [
  {
    method: 'POST' as HTTPMethods,
    url: '/course',
    schema: {
      body: CreateCourseRequest,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: CreateCourse.perform,
  },
  {
    method: 'PUT' as HTTPMethods,
    url: '/course/:courseId',
    schema: {
      body: UpdateCourseRequest,
      params: UpdateCourseRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: UpdateCourse.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/courses',
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetCourses.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/course/:courseId',
    schema: {
      params: GetCourseRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: GetCourse.perform,
  },
  {
    method: 'DELETE' as HTTPMethods,
    url: '/course/:courseId',
    schema: {
      params: DeleteCourseRequestParams,
    },
    preHandler: [Auth.canUserAccess([INSTRUCTORS])],
    handler: DeleteCourse.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/courses/active',
    schema: {
      querystring: GetActiveCourseQuery
    },
    preHandler: [Auth.canUserAccess([STUDENTS])],
    handler: GetActiveCourses.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/courses/:courseId/subscribe',
    schema: {
      params: SubscribeToCourseParams,
    },
    preHandler: [Auth.canUserAccess([STUDENTS])],
    handler: SubscribeCourse.perform,
  },
  {
    method: 'GET' as HTTPMethods,
    url: '/courses/:courseId/unsubscribe',
    schema: {
      params: UnsubscribeToCourseParams,
    },
    preHandler: [Auth.canUserAccess([STUDENTS])],
    handler: UnsubscribeCourse.perform,
  },
];
