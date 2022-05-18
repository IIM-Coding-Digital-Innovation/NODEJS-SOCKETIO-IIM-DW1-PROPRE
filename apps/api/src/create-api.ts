import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { jwt } from '@tinyhttp/jwt';
import { json } from 'milliparsec';
import type { PrismaClient } from '@prisma/client';
import { logger } from '@tinyhttp/logger';
import { userRoutes } from './user/user-routes';
import { projectRoutes } from './project/project-routes';
import { authRoutes } from './auth/auth-routes';

const createApi = (prisma: PrismaClient) => {
  const app = new App();

  app
    .use(jwt({ secret: process.env.JWT_SECRET ?? 'secret', algorithm: 'HS256' }))
    .use(cors())
    .use((req, res, next) => (req.headers['content-type'] === 'application/json' ? json()(req, res, next) : next()))
    .use(logger());

  authRoutes(app, prisma);
  userRoutes(app, prisma);
  projectRoutes(app, prisma);

  return app;
};

export { createApi };
