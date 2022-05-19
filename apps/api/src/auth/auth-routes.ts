import type { App } from '@tinyhttp/app';
import type { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import { getHandler } from './auth-handler';
// import { requireAuth } from '../util/middleware.js';

const authRoutes = (app: App, prisma: PrismaClient) => {
  const handler = getHandler(prisma);

  app.post(
    '/signin',
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty(),
    handler.signIn,
  );
  app.post(
    '/signup',
    body('email').isEmail().normalizeEmail(),
    body('name').notEmpty().trim().escape(),
    body('password').isLength({ min: 6 }),
    handler.signUp,
  );
};

export { authRoutes };
