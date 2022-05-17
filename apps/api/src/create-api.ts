import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { json } from 'milliparsec';
import type { PrismaClient } from '@prisma/client';
import { userRoutes } from './user/user-routes';

const createApi = (prisma: unknown) => {
  const app = new App();

  app
    .use(cors())
    .use((req, res, next) => (req.headers['content-type'] === 'application/json' ? json()(req, res, next) : next()));

  userRoutes(app, prisma as PrismaClient);
  // authRoutes(app, ajv, prisma)
  // profileRoutes(app, ajv, prisma)
  // articleRoutes(app, ajv, prisma)

  return app;
};

export { createApi };
