import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  detail: { type: String, required: true },

  unit_name: { type: String, required: true, default: "개"},
  unit_value: { type: Number, required: true },
  nutrition_weight: { type: String, required: true, default: "100g"},
  price: { type: Number, required: true },

  image: { type: String, required: true},
  cat_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  type_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
  
  discountRate: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 },

  likes: { type: Number, default: 0 }
}, { timestamps: true });

// 카테고리 이름을 가져오는 메서드
productSchema.methods.getCategoryName = async function() {
  await this.populate('cat_name');
  return this.cat_name ? this.cat_name.name : null;
};

// 종류 이름을 가져오는 메서드
productSchema.methods.getTypeName = async function() {
  await this.populate('type_name');
  return this.type_name ? this.type_name.name : null;
};

export const Product = mongoose.model('Product', productSchema);