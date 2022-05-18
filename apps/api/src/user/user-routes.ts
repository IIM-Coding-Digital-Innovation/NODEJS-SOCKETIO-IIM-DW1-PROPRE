import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import { getHandler } from './user-handler';
// import { requireAuth } from '../util/middleware.js';

const userRoutes = (app: App, prisma: PrismaClient) => {
  const handler = getHandler(prisma);

  app.get('/users', handler.getUsers);
  app.get('/users/:id', handler.getUser);
  app.post(
    '/users',
    body('email').isEmail().normalizeEmail(),
    body('name').trim().escape(),
    body('password').isLength({ min: 6 }),
    handler.createUser,
  );
  app.patch('/users/:id', handler.updateUser);
  app.delete('/users/:id', handler.deleteUser);
};

export { userRoutes };
