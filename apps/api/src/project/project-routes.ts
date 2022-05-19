import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import type { Server } from 'socket.io';
import { getHandler } from './project-handler';

const projectRoutes = (app: App, io: Server, prisma: PrismaClient) => {
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
