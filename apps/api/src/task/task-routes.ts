import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import { getHandler } from './task-handler';
// import { requireAuth } from '../util/middleware.js';

const taskRoutes = (app: App, prisma: PrismaClient) => {
  const handler = getHandler(prisma);

  app.get('/tasks', handler.getTasks);
  app.get('/tasks/:id', handler.getTask);
  app.post(
    '/tasks',
    body('name').notEmpty().trim().escape(),
    body('content').escape(),
    body('columnId').isInt(),
    handler.createTask,
  );
  app.patch(
    '/tasks/:id',
    body('name').trim().escape(),
    body('content').escape(),
    body('columnId').isInt(),
    handler.updateTask,
  );
  app.delete('/tasks/:id', handler.deleteTask);
};

export { taskRoutes };
