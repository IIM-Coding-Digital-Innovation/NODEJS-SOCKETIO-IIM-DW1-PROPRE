import type { Request, Response } from '@tinyhttp/app';
import { PrismaClient } from '@prisma/client';
import { hash, verify } from 'argon2';
import jwt from 'jsonwebtoken';
import { validateBody, sendError } from '../utils/errors';

const getHandler = (prisma: PrismaClient) => {
  const signIn = async (req: Request, res: Response) => {
    if (validateBody(req, res)) return;

    type userData = { email: string, password: string }
    const { email, password: unhashed }: userData = req.body;

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      sendError(res, 401, [{ msg: 'Invalid sign in' }]);
      return;
    }

    const { id, password: hashed, ...user } = foundUser;

    const isAuthenticated = await verify(hashed, unhashed);
    if (!isAuthenticated) {
      sendError(res, 401, [{ msg: 'Invalid sign in' }]);
      return;
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET ?? 'secret');
    res.status(201).json({
      user: {
        ...user,
        token,
      },
    });
  };

  const signUp = async (req: Request, res: Response) => {
    if (validateBody(req, res)) return;

    type userData = { email: string, name: string, password: string }
    const { email, name, password: unhashed }: userData = req.body;

    const password = await hash(unhashed);

    try {
      const { id, ...user } = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
      const token = jwt.sign({ id }, process.env.JWT_SECRET ?? 'secret');
      res.status(201).json({
        user: {
          token,
          ...user,
        },
      });
    } catch (err) {
      sendError(res, 400, [
        {
          value: email,
          msg: 'Email already in use',
        },
      ]);
    }
  };

  return {
    signIn,
    signUp,
  };
};

export { getHandler };
