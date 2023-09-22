import { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

type Product = InferSchemaType<typeof productSchema>;

export default model<Product>("product", productSchema);
