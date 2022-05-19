import type { Request, Response } from '@tinyhttp/app';
import { PrismaClient } from '@prisma/client';
import { sendError, validateBody } from '../utils/errors';

const getHandler = (prisma: PrismaClient) => {
  const getProjects = async (req: Request, res: Response) => {
    res.json(await prisma.project.findMany({
      include: {
        users: true,
        columns: true,
      },
    }));
  };

  const getProject = async (req: Request, res: Response) => {
    res.json(await prisma.project.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        users: true,
        columns: true,
      },
    }));
  };

  const createProject = async (req: Request, res: Response) => {
    if (validateBody(req, res)) return;

    try {
      const newProject = await prisma.project.create({
        data: {
          name: req.body.name,
        },
      });
      res.json(newProject);
    } catch (err) {
      sendError(res, 400, [
        {
          msg: 'Could not create project',
        },
      ]);
    }
  };

  const updateProject = async (req: Request, res: Response) => {
    if (validateBody(req, res)) return;

    try {
      const updatedProject = await prisma.project.update({
        where: {
          id: +req.params.id,
        },
        data: {
          name: req.body.name ?? undefined,
        },
      });
      res.json(updatedProject);
    } catch (err) {
      sendError(res, 400, [
        {
          msg: 'Could not update project',
        },
      ]);
    }
  };

  const deleteProject = async (req: Request, res: Response) => {
    try {
      res.json(await prisma.project.delete({
        where: {
          id: +req.params.id,
        },
      }));
    } catch (err) {
      sendError(res, 400, [
        {
          msg: 'Could not delete project',
        },
      ]);
    }
  };

  return {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };
};

export { getHandler };
