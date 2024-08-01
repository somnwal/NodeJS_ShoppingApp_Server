import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, STATUS_ERROR, STATUS_SUCCESS } from '../models/response.model';

export const userRouter = router({
  register: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ input }) => {
      try {
        // 사용자 이름 중복 체크
        const existingUsername = await User.findOne({ username: input.username });
        if (existingUsername) {
            return Response(
                STATUS_ERROR,
                {},
                "이미 사용 중인 사용자 이름입니다."
            );
        }

        // 이메일 중복 체크
        const existingEmail = await User.findOne({ email: input.email });
        if (existingEmail) {
            return Response(
                STATUS_ERROR,
                {},
                "이미 등록된 이메일 주소입니다."
            );
        }

        // 사용자 생성 및 저장
        const user = new User(input);
        await user.save();

        return Response(
          STATUS_SUCCESS,
          { userId: user._id },
          "회원가입이 정상적으로 완료되었습니다."
        );
      } catch (error) {
          console.error("Unexpected error:", error);
          return Response(
            STATUS_ERROR,
            {},
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        }
    }),

  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const user = await User.findOne({ email: input.email });
      if (!user || !(await bcrypt.compare(input.password, user.password))) {
        return Response(
            STATUS_ERROR,
            {},
            "아이디 혹은 비밀번호를 확인해주세요."
        )
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      return Response(
        STATUS_SUCCESS,
        {
            user_id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            mobile_code: user.mobile_code,
            auth_token: token,
            created_date: user.created_date
        },
        "정상적으로 로그인 되었습니다."
      );
    }),
});