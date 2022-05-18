import type { Request, Response } from '@tinyhttp/app';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import { hash } from 'argon2';

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

  const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    type userData = { email: string, name: string, password: string }
    const { email, name, password }: userData = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: await hash(password),
        },
      });
      res.json(newUser);
    } catch (err) {
      res.status(400).json({
        errors: [
          {
            value: email,
            msg: 'Email already in use',
          },
        ],
      });
    }
  };

  const updateUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

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
      res.status(400).json({
        errors: [
          {
            msg: 'Could not patch user',
          },
        ],
      });
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
      res.status(400).json({
        errors: [
          {
            msg: 'Could not delete user',
          },
        ],
      });
    }
  };

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
};

export { getHandler };
