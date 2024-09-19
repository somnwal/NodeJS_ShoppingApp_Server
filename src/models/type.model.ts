import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  color: { type: String, default: "F8A44C" }
}, { timestamps: true });

export const Type = mongoose.model('Type', typeSchema);