import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

export const Type = mongoose.model('Type', typeSchema);