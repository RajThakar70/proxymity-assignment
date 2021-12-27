import { FastifyInstance, FastifyError } from 'fastify';

import UserRoutes from './users';
import CourseRoutes from './courses';
import LessonRoutes from './lessons';
import SubjectRoutes from './subjects';
import TagRoutes from './tags';
import VideoRoutes from './videos';
import AuthenticationRoutes from './authentication';

const serverRoutes = [...AuthenticationRoutes];
const secureRoutes = [
  ...UserRoutes,
  ...CourseRoutes,
  ...LessonRoutes,
  ...SubjectRoutes,
  ...TagRoutes,
  ...VideoRoutes,
];

export default class Route {
  public static addRoutes(
    server: FastifyInstance,
    options: any,
    callback: (error?: FastifyError) => void
  ) {
    serverRoutes.forEach((routeJSON) => {
      server.route(routeJSON);
    });

    secureRoutes.forEach((routeJSON: any) => {
      routeJSON.preValidation = server.auth([server.validateJWT]);
      server.route(routeJSON);
    });

    callback();
  }
}
