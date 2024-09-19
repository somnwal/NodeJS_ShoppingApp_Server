import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  detail: { type: String, required: true },

  unit_name: { type: String, required: true, default: "개"},
  unit_value: { type: Number, required: true },
  nutrition_weight: { type: String, required: true, default: "100g"},
  price: { type: Number, required: true },

  image: { type: String, required: true},
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
  
  discountRate: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 },

  likes: { type: Number, default: 0 }
}, { timestamps: true });

// offer_price virtual 필드 추가
productSchema.virtual('offer_price').get(function() {
  // 할인율이 0이면 원래 가격 반환
  if (this.discountRate === 0) return this.price;
  
  // 할인된 가격 계산 (소수점 이하 반올림)
  const discountedPrice = this.price * (1 - this.discountRate / 100);
  return Math.round(discountedPrice);
});

interface ICategory {
  id: String,
  name: String
}

interface IType {
  id: String,
  name: String
}

// category_name virtual field
productSchema.virtual('cat_id').get(function() {
    return ((this.category as unknown) as ICategory)?.id || null;
});

// category_name virtual field
productSchema.virtual('cat_name').get(function() {
  return ((this.category as unknown) as ICategory)?.name || null;
});

// category_name virtual field
productSchema.virtual('type_id').get(function() {
  return ((this.type as unknown) as IType)?.id || null;
});

// category_name virtual field
productSchema.virtual('type_name').get(function() {
  return ((this.type as unknown) as IType)?.name || null;
});

// JSON 변환 시 가상 필드 포함
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export const Product = mongoose.model('Product', productSchema);