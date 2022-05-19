import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { json } from 'milliparsec';
import type { PrismaClient } from '@prisma/client';
import { userRoutes } from './user/user-routes';
import { projectRoutes } from './project/project-routes';
import { taskRoutes } from './task/task-routes';

const createApi = (prisma: PrismaClient) => {
  const app = new App();

  app
    .use(cors())
    .use((req, res, next) => (req.headers['content-type'] === 'application/json' ? json()(req, res, next) : next()));

  userRoutes(app, prisma);
  projectRoutes(app, prisma);
  taskRoutes(app, prisma);
  // authRoutes(app, ajv, prisma)
  // profileRoutes(app, ajv, prisma)
  // articleRoutes(app, ajv, prisma)

  return app;
};

export { createApi };
