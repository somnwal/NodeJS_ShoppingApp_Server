import { router, publicProcedure } from '../trpc';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { Type } from '../models/type.model';
import { Response, STATUS_SUCCESS } from '../models/response.model';

export const homeRouter = router({
  getHomeData: publicProcedure
    .mutation(async () => {
      // 특가 상품 리스트 (예: 할인율이 20% 이상인 상품)
      const offer_list = await Product.find({ discountRate: { $gte: 20 } }).limit(10)
      .populate('category')
      .populate('type')
      .exec();

      // 베스트셀러 리스트 (예: 판매량 기준 상위 10개)
      const best_sell_list = await Product.find().sort({ salesCount: -1 }).limit(10)
      .populate('category')
      .populate('type')
      .exec();

      const list = await Product.find().limit(10)
      .populate('category')
      .populate('type')
      .exec();

      const type_list = await Type.find();

      return Response(
        STATUS_SUCCESS,
        {
            offer_list,
            best_sell_list,
            type_list,
            list
        },
        "정상적으로 조회되었습니다."
        );
    }),

  // 추가적인 홈 관련 쿼리나 뮤테이션을 여기에 정의할 수 있습니다.
});