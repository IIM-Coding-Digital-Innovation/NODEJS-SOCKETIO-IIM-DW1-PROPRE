import type { Request, Response } from '@tinyhttp/app';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const newProject = await prisma.project.create({
        data: {
          name: req.body.name,
        },
      });
      res.json(newProject);
    } catch (err) {
      res.status(400).json({
        errors: [
          {
            msg: 'Cannot create project',
          },
        ],
      });
    }
  };

  const updateProject = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

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
      res.status(400).json({
        errors: [
          {
            msg: 'Could not patch project',
          },
        ],
      });
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
      res.status(400).json({
        errors: [
          {
            msg: 'Could not delete project',
          },
        ],
      });
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
