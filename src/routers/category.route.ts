import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Category } from '../models/category.model';

export const categoryRouter = router({
  getAll: publicProcedure
    .query(async () => {
      return await Category.find();
    }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await Category.findById(input);
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      parentCategory: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const category = new Category(input);
      await category.save();
      return category;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      parentCategory: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      return await Category.findByIdAndUpdate(id, updateData, { new: true });
    }),

  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await Category.findByIdAndDelete(input);
      return { message: 'Category deleted successfully' };
    }),
});