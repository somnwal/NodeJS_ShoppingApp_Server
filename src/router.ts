import { router } from './trpc';
import { userRouter } from './routers/user.router';
import { productRouter } from './routers/product.router';
import { reviewRouter } from './routers/review.router';
import { categoryRouter } from './routers/category.route';
import { typeRouter } from './routers/type.route';
import { homeRouter } from './routers/home.router';

export const appRouter = router({
  user: userRouter,

  home: homeRouter,

  product: productRouter,
  review: reviewRouter,

  category: categoryRouter,
  type: typeRouter
});

export type AppRouter = typeof appRouter;