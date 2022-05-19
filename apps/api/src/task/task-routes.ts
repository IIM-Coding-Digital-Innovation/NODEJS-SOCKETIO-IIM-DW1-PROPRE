import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import type { Server, Socket } from 'socket.io';
import { getHandler } from './task-handler';
import { getSocketHandler } from './task-sockets';

const taskRoutes = (app: App, io: Server, prisma: PrismaClient) => {
  const handler = getHandler(prisma);
  const socketHandler = getSocketHandler(io, prisma);

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

  io.on('connection', (socket: Socket) => {
    socket.on('tasks:move', socketHandler.moveTask);
    socket.on('task:edit', socketHandler.editTask);
  });
};

export { taskRoutes };
