import type { Request, Response } from '@tinyhttp/app';
import { PrismaClient } from '@prisma/client';
import { sendError, validateBody } from '../utils/errors';

const getHandler = (prisma: PrismaClient) => {
  const getColumns = async (req: Request, res: Response) => {
    res.json(await prisma.column.findMany({
      include: {
        project: true,
        tasks: true,
      },
    }));
  };

  const getColumn = async (req: Request, res: Response) => {
    res.json(await prisma.column.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        project: true,
        tasks: true,
      },
    }));
  };

  const createColumn = async (req: Request, res: Response) => {
    if (validateBody(req, res)) return;

    type columnData = { name: string, projectId: number }
    const { name, projectId }: columnData = req.body;

    try {
      const newColumn = await prisma.column.create({
        data: {
          name,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
      res.json(newColumn);
    } catch (err) {
      sendError(res, 400, [
        {
          msg: 'Could not create column',
        },
      ]);
    }
  };

  const updateColumn = async (req: Request, res: Response) => {
    if (validateBody(req, res)) return;

    type columnData = { name: string, projectId: number }
    const { name, projectId }: columnData = req.body;

    try {
      const updatedProject = await prisma.column.update({
        where: {
          id: +req.params.id,
        },
        data: {
          name: name ?? undefined,
          projectId: projectId ?? undefined,
        },
      });
      res.json(updatedProject);
    } catch (err) {
      sendError(res, 400, [
        {
          msg: 'Could not update column',
        },
      ]);
    }
  };

  const deleteColumn = async (req: Request, res: Response) => {
    try {
      res.json(await prisma.column.delete({
        where: {
          id: +req.params.id,
        },
      }));
    } catch (err) {
      sendError(res, 400, [
        {
          msg: 'Could not delete column',
        },
      ]);
    }
  };

  return {
    getColumns,
    getColumn,
    createColumn,
    updateColumn,
    deleteColumn,
  };
};

export { getHandler };
