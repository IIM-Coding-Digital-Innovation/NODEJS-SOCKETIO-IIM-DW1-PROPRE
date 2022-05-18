import Prisma from '@prisma/client';
import { createApi } from './src/create-api';

const prisma = new Prisma.PrismaClient();
const port = +(process.env.PORT ?? '3001');

createApi(prisma).listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port', port);
});
