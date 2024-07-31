import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Review } from '../models/review.model';

export const reviewRouter = router({
  create: publicProcedure
    .input(z.object({
      userId: z.string(),
      productId: z.string(),
      content: z.string(),
      rating: z.number().min(1).max(5),
    }))
    .mutation(async ({ input }) => {
      const review = new Review(input);
      await review.save();
      return { message: 'Review created successfully' };
    }),

  getByProduct: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await Review.find({ product: input }).populate('user', 'username');
    }),

  like: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const review = await Review.findById(input);
      if (!review) throw new Error('Review not found');
      review.likes += 1;
      await review.save();
      return { message: 'Review liked successfully' };
    }),

  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await Review.findByIdAndDelete(input);
      return { message: 'Review deleted successfully' };
    }),
});