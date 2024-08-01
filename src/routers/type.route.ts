import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Type } from '../models/type.model';

export const typeRouter = router({
  // 생성 (Create)
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const newType = new Type(input);
      await newType.save();
      return newType;
    }),

  // 조회 (Read)
  getAll: publicProcedure
    .query(async () => {
      return await Type.find();
    }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const type = await Type.findById(input);
      if (!type) throw new Error('Type not found');
      return type;
    }),

  // 수정 (Update)
  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      const updatedType = await Type.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedType) throw new Error('Type not found');
      return updatedType;
    }),

  // 삭제 (Delete)
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const deletedType = await Type.findByIdAndDelete(input);
      if (!deletedType) throw new Error('Type not found');
      return { message: 'Type deleted successfully', deletedType };
    }),
});