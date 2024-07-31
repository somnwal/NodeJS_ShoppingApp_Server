import { router } from './trpc';
import { userRouter } from './routers/user.router';
import { productRouter } from './routers/product.router';
import { reviewRouter } from './routers/review.router';

export const appRouter = router({
  user: userRouter,
  product: productRouter,
  review: reviewRouter
});

export type AppRouter = typeof appRouter;