import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Product } from '../models/product.model';

export const productRouter = router({
  getAll: publicProcedure
  .query(async ()=> {
      return await Product.find()
      .populate('category')
      .populate('type')
  }),

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
      category: z.string(), // Category ObjectId
      type: z.string(), // Type ObjectId
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
    // 새로운 delete 프로시저 추가
    deleteProduct: publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .mutation(async ({ input }) => {
      const deletedProduct = await Product.findByIdAndDelete(input.id);
      if (!deletedProduct) {
        throw new Error('Product not found');
      }
      return { message: 'Product deleted successfully', deletedProduct };
    }),

    updateProduct: publicProcedure
    .input(z.object({
      id: z.string(),
      updateData: z.object({
        name: z.string(),
        detail: z.string(),
        unit_name: z.string(),
        unit_value: z.number(),
        nutrition_weight: z.string(),
        price: z.number(),
        image: z.string(),
        category: z.string(),
        type: z.string(),
        discountRate: z.number(),
        salesCount: z.number(),
        likes: z.number()
      }).partial()
    }))
    .mutation(async ({ input }) => {
      const { id, updateData } = input;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      
      if (!updatedProduct) {
        throw new Error('Product not found');
      }
      
      return updatedProduct;
    }),
});