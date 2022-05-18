import type { Request, Response } from '@tinyhttp/app';
import { validationResult } from 'express-validator';
import type { ValidationError } from 'express-validator';

type BodyError = ValidationError[] | { code?: string, value?: string, msg: string }[];

const validateBody = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendError(res, 400, errors.array());
  }
  return !errors.isEmpty();
};

const sendError = (res: Response, code: number, errors: BodyError) => {
  res.status(code).json({
    errors,
  });
};

export {
  validateBody,
  sendError,
};
