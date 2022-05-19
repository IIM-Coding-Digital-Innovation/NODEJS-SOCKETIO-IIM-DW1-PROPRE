/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PrismaClient } from '@prisma/client';
import type { Server } from 'socket.io';

const getSocketHandler = (io: Server, prisma: PrismaClient) => {
  const moveTask = async (payload?: any) => {
    try {
      await prisma.task.update({
        where: {
          id: payload?.task?.id,
        },
        data: {
          column: {
            connect: { id: payload?.columnId },
          },
        },
      });
      io.emit('tasks:move', payload);
    } catch (err) {
      console.error(err);
    }
  };

  const editTask = async (payload?: any) => {
    try {
      await prisma.task.update({
        where: {
          id: payload?.task?.id,
        },
        data: {
          name: payload?.task?.name,
          content: payload?.task?.content,
        },
      });
      io.emit('tasks:edit', payload);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    moveTask,
    editTask,
  };
};

export { getSocketHandler };
