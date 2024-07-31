import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Product } from '../models/product.model';

export const productRouter = router({
  search: publicProcedure
    .input(z.object({
      query: z.string(),
    }))
    .query(async ({ input }) => {
      return await Product.find({ $text: { $search: input.query } });
    }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await Product.findById(input);
    }),

  getByCategory: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await Product.find({ category: input });
    }),

  like: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const product = await Product.findById(input);
      if (!product) throw new Error('Product not found');
      product.likes += 1;
      await product.save();
      return { message: 'Product liked successfully' };
    }),
});