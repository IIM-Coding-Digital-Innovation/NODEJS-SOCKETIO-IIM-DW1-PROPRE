import { Server } from 'socket.io';
import http from 'http';
import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { jwt } from '@tinyhttp/jwt';
import { json } from 'milliparsec';
import type { PrismaClient } from '@prisma/client';
import { logger } from '@tinyhttp/logger';
import { userRoutes } from './user/user-routes';
import { projectRoutes } from './project/project-routes';
import { authRoutes } from './auth/auth-routes';
import { taskRoutes } from './task/task-routes';
import { columnRoutes } from './column/column-routes';

const createApi = (prisma: PrismaClient) => {
  const app = new App();
  const server = http.createServer();
  server.on('request', app.attach);
  const io = new Server(server);

  app
    .use(jwt({ secret: process.env.JWT_SECRET ?? 'secret', algorithm: 'HS256' }))
    .use(cors())
    .use((req, res, next) => (req.headers['content-type'] === 'application/json' ? json()(req, res, next) : next()))
    .use(logger());

  authRoutes(app, io, prisma);
  userRoutes(app, io, prisma);
  projectRoutes(app, io, prisma);
  taskRoutes(app, io, prisma);
  columnRoutes(app, io, prisma);

  return server;
};

export { createApi };
