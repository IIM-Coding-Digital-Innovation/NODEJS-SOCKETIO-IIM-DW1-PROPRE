import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import { getHandler } from './user-handler';
import { requireAuth } from '../utils/middlewares/auth';

const userRoutes = (app: App, prisma: PrismaClient) => {
  const handler = getHandler(prisma);

  app.get('/users', requireAuth, handler.getUsers);
  app.get('/users/:id', handler.getUser);
  app.patch(
    '/users/:id',
    requireAuth,
    body('email').isEmail().normalizeEmail(),
    body('name').trim().escape(),
    body('password').isLength({ min: 6 }),
    handler.updateUser,
  );
  app.delete('/users/:id', requireAuth, handler.deleteUser);
};

export { userRoutes };
