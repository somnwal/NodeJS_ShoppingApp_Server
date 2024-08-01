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

    addProduct: publicProcedure
    .input(z.object({
      name: z.string(),
      detail: z.string(),
      unit_name: z.string().default("개"),
      unit_value: z.number(),
      nutrition_weight: z.string().default("100g"),
      price: z.number(),
      image: z.string(),
      cat_name: z.string(), // Category ObjectId
      type_name: z.string(), // Type ObjectId
      discountRate: z.number().default(0),
      salesCount: z.number().default(0),
      likes: z.number().default(0)
    }))
    .mutation(async ({ input }) => {
      const newProduct = new Product(input);
      await newProduct.save();
      return newProduct;
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