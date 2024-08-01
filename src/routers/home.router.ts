import { router, publicProcedure } from '../trpc';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

export const homeRouter = router({
  getHomeData: publicProcedure
    .query(async () => {
      // 특가 상품 리스트 (예: 할인율이 20% 이상인 상품)
      const specialOffers = await Product.find({ discountRate: { $gte: 20 } }).limit(10);

      // 베스트셀러 리스트 (예: 판매량 기준 상위 10개)
      const bestSellers = await Product.find().sort({ salesCount: -1 }).limit(10);

      // 카테고리 목록
      const categories = await Category.find().limit(5);

      // 각 카테고리별 추천 상품
      const categoryRecommendations = await Promise.all(
        categories.map(async (category) => {
          const products = await Product.find({ category: category._id }).limit(5);
          return {
            category: category.name,
            products,
          };
        })
      );

      return {
        specialOffers,
        bestSellers,
        categoryRecommendations,
      };
    }),

  // 추가적인 홈 관련 쿼리나 뮤테이션을 여기에 정의할 수 있습니다.
});