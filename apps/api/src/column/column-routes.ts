import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import type { Server } from 'socket.io';
import { getHandler } from './column-handler';

const projectRoutes = (app: App, io: Server, prisma: PrismaClient) => {
  const handler = getHandler(prisma);

  app.get('/projects', handler.getColumns);
  app.get('/projects/:id', handler.getColumn);
  app.post(
    '/projects',
    body('name').notEmpty().trim().escape(),
    handler.createColumn,
  );
  app.patch('/projects/:id', handler.updateColumn);
  app.delete('/projects/:id', handler.deleteColumn);
};

export { projectRoutes };
