import type { Request, Response } from '@tinyhttp/app';
import type { Prisma, PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';

const getHandler = (prisma: PrismaClient) => {
  const getTasks = async (req: Request, res: Response) => {
    res.json(await prisma.task.findMany());
  };

  const getTask = async (req: Request, res: Response) => {
    res.json(await prisma.task.findUnique({
      where: {
        id: +req.params.id,
      },
    }));
  };

  const createTask = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    type taskData = { name: string, content: Prisma.JsonArray, columnId: number }
    const { name, content, columnId }: taskData = req.body;

    try {
      const newTask = await prisma.task.create({
        data: {
          name,
          content,
          column: {
            connect: { id: columnId },
          },
        },
      });
      res.json(newTask);
    } catch (err) {
      res.status(400).json({
        errors: [
          {
            msg: 'Could not create task',
          },
        ],
      });
    }
  };

  const updateTask = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    type taskData = { name: string, content: Prisma.JsonArray, columnId: number }
    const { name, content, columnId }: taskData = req.body;

    try {
      const newTask = await prisma.task.update({
        where: {
          id: +req.params.id,
        },
        data: {
          name: name ?? undefined,
          content: content ?? undefined,
          columnId: columnId ?? undefined,
        },
      });
      res.json(newTask);
    } catch (err) {
      res.status(400).json({
        errors: [
          {
            msg: 'Could not update task',
          },
        ],
      });
    }
  };

  const deleteTask = async (req: Request, res: Response) => {
    try {
      res.json(await prisma.task.delete({
        where: {
          id: +req.params.id,
        },
      }));
    } catch (err) {
      res.status(400).json({
        errors: [
          {
            msg: 'Could not delete task',
          },
        ],
      });
    }
  };

  return {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
  };
};

export { getHandler };
