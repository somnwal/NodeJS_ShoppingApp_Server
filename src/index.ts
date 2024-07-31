import cors from 'cors';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { connectDB } from './db';
import { createContext } from './context';

const app = express();

app.use(cors());

app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
);

const serverPort = process.env.SERVER_PORT || 50003;

const start = async () => {
  await connectDB();
  app.listen(serverPort, () => {
    console.log(`Server started on http://localhost:${serverPort}`);
  });
};

start();

export type AppRouter = typeof appRouter;