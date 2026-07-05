import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: String,
  description: String,
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export const Product = models.Product || model("Product", ProductSchema);
