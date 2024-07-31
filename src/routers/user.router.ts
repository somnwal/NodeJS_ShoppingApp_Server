import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRouter = router({
  register: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ input }) => {
      const user = new User(input);
      await user.save();
      return { message: 'User registered successfully' };
    }),

  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const user = await User.findOne({ email: input.email });
      if (!user || !(await bcrypt.compare(input.password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const success = true
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      return { success, token };
    }),
});