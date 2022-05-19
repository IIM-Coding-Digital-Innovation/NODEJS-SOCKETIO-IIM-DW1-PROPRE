import type { Request, Response } from '@tinyhttp/app';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import { sendError, validateBody } from '../utils/errors';

const getHandler = (prisma: PrismaClient) => {
  const getUsers = async (req: Request, res: Response) => {
    res.json(await prisma.user.findMany({
      include: {
        projects: true,
      },
    }));
  };

  const getUser = async (req: Request, res: Response) => {
    res.json(await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        projects: true,
      },
    }));
  };

  const updateUser = async (req: Request, res: Response) => {
    if (validateBody(req, res)) return;

    type userData = { email: string, name: string, password: string }
    const { email, name, password }: userData = req.body;

    try {
      const newUser = await prisma.user.update({
        where: {
          id: +req.params.id,
        },
        data: {
          email: email ?? undefined,
          name: name ?? undefined,
          password: password ? await hash(password) : undefined,
        },
      });
      res.json(newUser);
    } catch (err) {
      sendError(res, 400, [
        {
          msg: 'Could not update user',
        },
      ]);
    }
  };

  const deleteUser = async (req: Request, res: Response) => {
    try {
      res.json(await prisma.user.delete({
        where: {
          id: +req.params.id,
        },
      }));
    } catch (err) {
      sendError(res, 400, [
        {
          msg: 'Could not delete user',
        },
      ]);
    }
  };

  return {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
  };
};

export { getHandler };
