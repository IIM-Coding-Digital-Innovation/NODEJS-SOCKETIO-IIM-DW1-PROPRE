import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import type { Server } from 'socket.io';
import { getHandler } from './column-handler';

const columnRoutes = (app: App, io: Server, prisma: PrismaClient) => {
  const handler = getHandler(prisma);

  app.get('/columns', handler.getColumns);
  app.get('/columns/:id', handler.getColumn);
  app.post(
    '/columns',
    body('name').notEmpty().trim().escape(),
    handler.createColumn,
  );
  app.patch('/columns/:id', handler.updateColumn);
  app.delete('/columns/:id', handler.deleteColumn);
};

export { columnRoutes };
