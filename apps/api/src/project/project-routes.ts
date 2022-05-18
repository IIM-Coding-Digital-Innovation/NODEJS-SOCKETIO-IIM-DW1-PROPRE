import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import { getHandler } from './project-handler';
// import { requireAuth } from '../util/middleware.js';

const projectRoutes = (app: App, prisma: PrismaClient) => {
  const handler = getHandler(prisma);

  app.get('/projects', handler.getProjects);
  app.get('/projects/:id', handler.getProject);
  app.post(
    '/projects',
    body('name').notEmpty().trim().escape(),
    handler.createProject,
  );
  app.patch('/projects/:id', handler.updateProject);
  app.delete('/projects/:id', handler.deleteProject);
};

export { projectRoutes };
