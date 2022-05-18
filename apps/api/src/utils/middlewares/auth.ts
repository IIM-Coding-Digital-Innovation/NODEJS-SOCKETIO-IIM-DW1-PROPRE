/* eslint-disable consistent-return */
import type { NextFunction, Request, Response } from '@tinyhttp/app';
import { sendError } from '../errors';

type AuthenticatedRequest = Request & { user: unknown };

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if ((req as AuthenticatedRequest)?.user) return next();
  sendError(res, 401, [{ msg: 'You are not authorized to request this endpoint' }]);
};

export {
  requireAuth,
};
